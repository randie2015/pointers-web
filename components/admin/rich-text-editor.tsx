'use client';

import { useEffect, useRef } from 'react';
import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Underline
} from 'lucide-react';
import { cn } from '@/lib/utils';

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const TOOLBAR = [
  { command: 'bold', icon: Bold, label: 'Negrita' },
  { command: 'italic', icon: Italic, label: 'Cursiva' },
  { command: 'underline', icon: Underline, label: 'Subrayado' },
  { command: 'formatBlock', value: 'h2', icon: Heading2, label: 'Título H2' },
  { command: 'formatBlock', value: 'h3', icon: Heading3, label: 'Título H3' },
  { command: 'insertUnorderedList', icon: List, label: 'Lista' },
  { command: 'insertOrderedList', icon: ListOrdered, label: 'Lista numerada' },
  { command: 'formatBlock', value: 'blockquote', icon: Quote, label: 'Cita' }
] as const;

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current || editorRef.current.innerHTML === value) return;
    editorRef.current.innerHTML = value;
  }, [value]);

  function emitChange() {
    onChange(editorRef.current?.innerHTML ?? '');
  }

  function runCommand(command: string, commandValue?: string) {
    editorRef.current?.focus();

    if (command === 'createLink') {
      const url = window.prompt('URL del enlace:');
      if (url) document.execCommand('createLink', false, url);
    } else {
      document.execCommand(command, false, commandValue);
    }

    emitChange();
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex flex-wrap gap-1 border-b border-gray-200 bg-gray-50 p-2">
        {TOOLBAR.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={`${item.command}-${'value' in item ? item.value : ''}`}
              type="button"
              title={item.label}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() =>
                runCommand(item.command, 'value' in item ? item.value : undefined)
              }
              className="rounded-lg p-2 text-gray-600 transition hover:bg-white hover:text-brand"
            >
              <Icon size={16} />
            </button>
          );
        })}
        <button
          type="button"
          title="Enlace"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => runCommand('createLink')}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-white hover:text-brand"
        >
          <Link2 size={16} />
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={emitChange}
        data-placeholder={placeholder}
        className={cn(
          'min-h-[220px] px-4 py-3 text-sm leading-relaxed text-gray-800 outline-none',
          '[&:empty]:before:pointer-events-none [&:empty]:before:text-gray-400 [&:empty]:before:content-[attr(data-placeholder)]',
          '[&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:text-xl [&_h2]:font-bold',
          '[&_h3]:mb-2 [&_h3]:mt-3 [&_h3]:text-lg [&_h3]:font-semibold',
          '[&_p]:mb-3 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5',
          '[&_blockquote]:border-l-4 [&_blockquote]:border-brand/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600',
          '[&_a]:text-brand [&_a]:underline'
        )}
      />
    </div>
  );
}
