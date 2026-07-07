'use client';

import { useEffect, useRef } from 'react';
import {
  Bold,
  Columns3,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Rows3,
  Table2,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { sanitizeBlogHtmlInBrowser } from '@/lib/cms/sanitize-blog-html';
import {
  addTableColumn,
  addTableRow,
  deleteTable,
  deleteTableColumn,
  deleteTableRow,
  insertTable
} from '@/lib/cms/rich-text-tables';

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const TOOLBAR = [
  { command: 'formatBlock', value: 'h2', icon: Heading2, label: 'Subtítulo' },
  { command: 'formatBlock', value: 'h3', icon: Heading3, label: 'Subtítulo menor' },
  { command: 'formatBlock', value: 'p', icon: Pilcrow, label: 'Párrafo' },
  { command: 'bold', icon: Bold, label: 'Negrita' },
  { command: 'italic', icon: Italic, label: 'Cursiva' },
  { command: 'insertUnorderedList', icon: List, label: 'Lista' },
  { command: 'insertOrderedList', icon: ListOrdered, label: 'Lista numerada' }
] as const;

const TABLE_TOOLBAR = [
  { action: 'insertTable', icon: Table2, label: 'Insertar tabla 3×3' },
  { action: 'addRow', icon: Rows3, label: 'Añadir fila' },
  { action: 'addColumn', icon: Columns3, label: 'Añadir columna' },
  { action: 'deleteRow', icon: Minus, label: 'Eliminar fila' },
  { action: 'deleteColumn', icon: Minus, label: 'Eliminar columna' },
  { action: 'deleteTable', icon: Trash2, label: 'Eliminar tabla' }
] as const;

type TableAction = (typeof TABLE_TOOLBAR)[number]['action'];

const editorTypographyClass =
  'font-sans text-sm leading-relaxed text-gray-800 [&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:mb-2 [&_h3]:mt-3 [&_h3]:text-lg [&_h3]:font-semibold [&_p]:mb-3 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5';

const editorTableClass =
  '[&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:bg-transparent [&_th]:border-0 [&_th]:border-b [&_th]:border-gray-200 [&_th]:bg-transparent [&_th]:px-3 [&_th]:py-2.5 [&_th]:text-left [&_th]:align-top [&_th]:font-semibold [&_th]:text-gray-900 [&_td]:border-0 [&_td]:border-b [&_td]:border-gray-200 [&_td]:bg-transparent [&_td]:px-3 [&_td]:py-2.5 [&_td]:text-left [&_td]:align-top [&_td]:text-gray-700';

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.execCommand('styleWithCSS', false, 'false');
  }, []);

  useEffect(() => {
    if (!editorRef.current) return;

    const sanitized = sanitizeBlogHtmlInBrowser(value);
    if (editorRef.current.innerHTML !== sanitized) {
      editorRef.current.innerHTML = sanitized;
    }
  }, [value]);

  function emitChange() {
    const raw = editorRef.current?.innerHTML ?? '';
    onChange(sanitizeBlogHtmlInBrowser(raw));
  }

  function runCommand(command: string, commandValue?: string) {
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    emitChange();
  }

  function runTableAction(action: TableAction) {
    if (!editorRef.current) return;

    editorRef.current.focus();

    switch (action) {
      case 'insertTable':
        insertTable(editorRef.current);
        break;
      case 'addRow':
        addTableRow();
        break;
      case 'addColumn':
        addTableColumn();
        break;
      case 'deleteRow':
        deleteTableRow();
        break;
      case 'deleteColumn':
        deleteTableColumn();
        break;
      case 'deleteTable':
        deleteTable();
        break;
    }

    emitChange();
  }

  function handlePaste(event: React.ClipboardEvent<HTMLDivElement>) {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
    emitChange();
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white font-sans">
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 p-2">
        {TOOLBAR.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={`${item.command}-${'value' in item ? item.value : ''}`}
              type="button"
              title={item.label}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() =>
                runCommand(item.command, 'value' in item ? item.value : undefined)
              }
              className="rounded-lg p-2 text-gray-600 transition hover:bg-white hover:text-brand"
            >
              <Icon size={16} />
            </button>
          );
        })}

        <span className="mx-1 h-5 w-px bg-gray-200" aria-hidden />

        {TABLE_TOOLBAR.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.action}
              type="button"
              title={item.label}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => runTableAction(item.action)}
              className="rounded-lg p-2 text-gray-600 transition hover:bg-white hover:text-brand"
            >
              <Icon size={16} />
            </button>
          );
        })}
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={emitChange}
        onPaste={handlePaste}
        data-placeholder={placeholder}
        className={cn(
          'min-h-[220px] px-4 py-3 outline-none',
          editorTypographyClass,
          editorTableClass,
          '[&:empty]:before:pointer-events-none [&:empty]:before:text-gray-400 [&:empty]:before:content-[attr(data-placeholder)]',
          '[&_*]:!font-[inherit]'
        )}
      />
    </div>
  );
}
