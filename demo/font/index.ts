const fontsList = ['Vazirmatn', 'Sahel'];

const select = document.getElementById('select-font')!;
const fontPreview = document.getElementById('font-preview')!;
for (const font of fontsList) {
  select.innerHTML = select.innerHTML + `<option>${font}</option>`;
}

function changeFont(className: string): void {
  fontPreview.className = className;
}

select.addEventListener('change', () => {
  changeFont((select as HTMLSelectElement).value);
});

(select as HTMLSelectElement).value = fontsList[0];
changeFont(fontsList[0]);
