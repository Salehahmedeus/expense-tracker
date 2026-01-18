export function downloadCsvFromExpenses(expenses) {
  const header = ['Description', 'Amount', 'Category', 'Date'];
  const rows = (expenses || []).map((expense) => [
    expense.desc ?? '',
    typeof expense.amount === 'number' ? expense.amount.toFixed(2) : expense.amount ?? '',
    expense.category ?? '',
    expense.date ?? ''
  ]);

  const escapeCell = (value) => String(value).replace(/"/g, '""');
  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${escapeCell(cell)}"`).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `expenses-${new Date().toISOString().slice(0, 10)}.csv`;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
