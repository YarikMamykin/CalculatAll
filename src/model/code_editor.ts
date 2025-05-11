import { type Ref } from "vue";
import { basicSetup } from "codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { EditorState, Compartment, Prec } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { js } from "js-beautify";

export class CodeEditor {
  public view: EditorView | null;
  private readonly startState: EditorState;
  constructor(
    public readonly editorRef: Ref<HTMLElement | null>,
    intialValue: string,
  ) {
    this.view = null;

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

    const customKeymap = keymap.of([
      {
        key: "Backspace",
        run: (view) => {
          console.log("Custom Backspace handler!");
          const cursorPos = view.state.selection.main.head;
          const line = view.state.doc.lineAt(cursorPos);
          console.log(`On line ${line.number}: "${line.text}"`);
          return false;
        },
      },
    ]);

    this.startState = EditorState.create({
      doc: intialValue,
      extensions: [
        basicSetup,
        EditorView.lineWrapping,
        javascript({ typescript: true }),
        languageCompartment.of(javascript({ typescript: true })),
        themeCompartment.of(customTheme),
        syntaxHighlighting(customHighlight),
        Prec.highest(customKeymap),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            console.log(update.state.doc.toString());
          }
        }),
        EditorView.domEventHandlers({
          keydown: (event, view) => {
            console.log(event.key);
            const cursorPos = view.state.selection.main.head;
            const line = view.state.doc.lineAt(cursorPos);

            console.log("Clicked on line:", line.number);
            console.log("Line content:", line.text);
            // event.preventDefault();
            // event.stopPropagation();
            return false;
          },
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
  }

  public unmount(): void {
    this.view?.destroy();
    this.view = null;
  }

  public format(): void {
    if (!this.view) {
      return;
    }
    // Get the current code from CodeMirror
    const code = this.view.state.doc.toString();
    const formattedCode = js(code);
    this.view.dispatch({
      changes: {
        from: 0,
        to: this.view.state.doc.length,
        insert: formattedCode,
      },
    });

    // Use pretty-quick to format the code
    // Note: pretty-quick typically works with files, so we simulate a file-like input
  }
}
