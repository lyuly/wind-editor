import { useRef, useState, useEffect } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

const Editor = () => {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>();
  const monacoEl = useRef(null);

  const [theme, setTheme] = useState("vs-light");

  useEffect(() => {
    if (monacoEl) {
      setEditor((editor) => {
        if (editor) return;

        return monaco.editor.create(monacoEl.current!, {
          value: '',
          language: "typescript",
          theme: theme,
        });
      });
    }

    return () => editor?.dispose();
  }, [monacoEl.current]);

	useEffect(() => {
		monaco.editor.setTheme(theme)
	}, [theme])

  return (
    <div>
      <div className="w-screen h-screen" ref={monacoEl}>
        <div className="flex justify-start flex-col items-start bg-gray-50 dark:bg-gray-700">
          <label htmlFor="theme" className="block mb-2 text-base font-medium text-gray-900 dark:text-white dark:bg-gray-700">theme</label>
					<select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="theme-style" onChange={e => setTheme(e.target.value)} value={theme}>
						<option value=''>choose theme</option>
						<option value="vs-light">light</option>
						<option value='vs-dark'>dark</option>
					</select>
        </div>
      </div>
    </div>
  );
};

export default Editor