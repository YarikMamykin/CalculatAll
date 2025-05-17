import { type Ref } from "vue";
import { basicSetup } from "codemirror";
import { EditorView } from "@codemirror/view";
import { EditorState, Compartment, type Extension } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { js } from "js-beautify";

export class CodeEditor {
  private view: EditorView | null;
  private readonly startState: EditorState;
  private readonlyEnabled: boolean;

  constructor(
    public readonly editorRef: Ref<HTMLElement | null>,
    intialValue: string,
  ) {
    this.view = null;
    this.readonlyEnabled = false;

    const themeCompartment = new Compartment();
    const languageCompartment = new Compartment();
    const customTheme = EditorView.theme({}, { dark: true });
    const customHighlight = HighlightStyle.define([
      { tag: tags.keyword, class: "cm-keyword" },
      { tag: tags.string, class: "cm-string" },
      { tag: tags.comment, class: "cm-comment" },
      { tag: tags.number, class: "cm-number" },
      { tag: tags.operator, class: "cm-operator" },
      { tag: tags.typeName, class: "cm-typeName" },
      { tag: tags.definition(tags.name), class: "cm-definition" },
      { tag: tags.propertyName, class: "cm-propertyName" },
      { tag: tags.literal, class: "cm-literal" },
      { tag: tags.meta, class: "cm-meta" },
    ]);

    this.startState = EditorState.create({
      doc: intialValue,
      extensions: [
        basicSetup,
        this.readonlyFirstLastLines(),
        EditorView.lineWrapping,
        javascript({ typescript: true }),
        languageCompartment.of(javascript({ typescript: true })),
        themeCompartment.of(customTheme),
        syntaxHighlighting(customHighlight),
        EditorView.domEventHandlers({
          blur: (_, __) => {
            this.format();
          },
        }),
      ],
    });
  }

  public mount(): void {
    if (!this.editorRef.value) {
      console.error("Editor ref is not available");
      return;
    }

    this.view = new EditorView({
      state: this.startState,
      parent: this.editorRef.value,
    });
    this.format();
    this.readonlyEnabled = true;
  }

  public unmount(): void {
    this.view?.destroy();
    this.view = null;
    this.readonlyEnabled = false;
  }

  public format(): void {
    if (!this.view) {
      return;
    }
    const code = this.view.state.doc.toString();
    const formattedCode = js(code);
    this.readonlyEnabled = false;
    this.view.dispatch({
      changes: {
        from: 0,
        to: this.view.state.doc.length,
        insert: formattedCode,
      },
    });
    this.readonlyEnabled = true;
  }

  public get code(): string {
    if (!this.view || 2 === this.view.state.doc.lines) {
      return "";
    }

    const doc = this.view.state.doc;

    const start = doc.line(2).from;
    const end = doc.line(doc.lines - 1).to;
    return this.view.state.sliceDoc(start, end);
  }

  private readonlyFirstLastLines(): Extension {
    return EditorState.transactionFilter.of((tr) => {
      if (!tr.docChanged || !this.readonlyEnabled) return tr;

      const doc = tr.startState.doc;

      // Get the first and last line boundaries
      const firstLineEnd = doc.line(1).to;
      const lastLineStart = doc.line(doc.lines).from;

      // Check if changes affect readonly areas
      let cancel = false;
      tr.changes.iterChanges((fromA, toA, _, __, ___) => {
        // Check if change affects first line
        if (fromA <= firstLineEnd) {
          cancel = true;
        }

        // Check if change affects last line
        if (toA > lastLineStart) {
          cancel = true;
        }
      });

      // Cancel transaction if it affects readonly areas
      if (cancel) {
        return [];
      }

      return tr;
    });
  }
}
