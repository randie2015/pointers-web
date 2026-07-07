export const DEFAULT_TABLE_ROWS = 3;
export const DEFAULT_TABLE_COLS = 3;

export function buildTableHtml(rows = DEFAULT_TABLE_ROWS, cols = DEFAULT_TABLE_COLS): string {
  const bodyRows = Array.from({ length: rows }, (_, rowIndex) => {
    const cells = Array.from({ length: cols }, (_, colIndex) => {
      const tag = rowIndex === 0 ? 'th' : 'td';
      return `<${tag}>&nbsp;</${tag}>`;
    }).join('');

    return `<tr>${cells}</tr>`;
  }).join('');

  return `<table><tbody>${bodyRows}</tbody></table><p><br></p>`;
}

function getSelectionAnchorElement(): HTMLElement | null {
  const selection = window.getSelection();
  if (!selection?.anchorNode) return null;

  const node = selection.anchorNode;
  return node.nodeType === Node.ELEMENT_NODE
    ? (node as HTMLElement)
    : node.parentElement;
}

export function getActiveTableCell(): HTMLTableCellElement | null {
  const element = getSelectionAnchorElement();
  return element?.closest('td, th') ?? null;
}

export function getActiveTable(): HTMLTableElement | null {
  const cell = getActiveTableCell();
  return cell?.closest('table') ?? null;
}

export function insertTable(editor: HTMLElement, rows = DEFAULT_TABLE_ROWS, cols = DEFAULT_TABLE_COLS) {
  editor.focus();
  document.execCommand('insertHTML', false, buildTableHtml(rows, cols));
}

export function addTableRow() {
  const cell = getActiveTableCell();
  if (!cell) return false;

  const row = cell.closest('tr');
  const section = row?.parentElement;
  if (!row || !section) return false;

  const newRow = row.cloneNode(true) as HTMLTableRowElement;
  Array.from(newRow.cells).forEach((tableCell) => {
    tableCell.innerHTML = '&nbsp;';
  });

  section.insertBefore(newRow, row.nextSibling);
  return true;
}

export function addTableColumn() {
  const cell = getActiveTableCell();
  const table = getActiveTable();
  if (!cell || !table) return false;

  const insertIndex = cell.cellIndex + 1;

  Array.from(table.rows).forEach((row) => {
    const cellTag = row.rowIndex === 0 ? 'th' : 'td';
    const newCell = document.createElement(cellTag);
    newCell.innerHTML = '&nbsp;';
    row.insertBefore(newCell, row.cells[insertIndex] ?? null);
  });

  return true;
}

export function deleteTableRow() {
  const cell = getActiveTableCell();
  const row = cell?.closest('tr');
  const section = row?.parentElement;
  if (!row || !section) return false;

  if (section.querySelectorAll('tr').length <= 1) {
    return deleteTable();
  }

  row.remove();
  return true;
}

export function deleteTableColumn() {
  const cell = getActiveTableCell();
  const table = getActiveTable();
  if (!cell || !table) return false;

  const columnCount = table.rows[0]?.cells.length ?? 0;
  if (columnCount <= 1) {
    return deleteTable();
  }

  const columnIndex = cell.cellIndex;
  Array.from(table.rows).forEach((row) => {
    row.deleteCell(columnIndex);
  });

  return true;
}

export function deleteTable() {
  const table = getActiveTable();
  if (!table) return false;

  table.remove();
  return true;
}
