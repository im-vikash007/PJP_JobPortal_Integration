
function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        if (column === 6) {
            const aColPrice = parseFloat(a.querySelector(`td:nth-child(${column + 1})`).textContent.trim().replace('$', ''));
            const bColPrice = parseFloat(b.querySelector(`td:nth-child(${column + 1})`).textContent.trim().replace('$', ''));

            return aColPrice > bColPrice ? (1 * dirModifier) : (-1 * dirModifier);
        }
        else if (column === 3) {
            const aColPrice = new Date(a.querySelector(`td:nth-child(${column + 1})`).textContent.trim());
            const bColPrice = new Date(b.querySelector(`td:nth-child(${column + 1})`).textContent.trim());
            return aColPrice > bColPrice ? (1 * dirModifier) : (-1 * dirModifier);
        }
        else if (column === 0 || column === 1 || column === 2 || column === 6 || column === 8) {
            const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
            const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
            return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
        }
        return;
    });

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted
    if (column === 0 || column === 1 || column === 2 || column === 3 || column === 6 || column === 8) {

        table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
        table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
        table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
    }
}

document.querySelectorAll("#table-sortable th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const heraderIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains('th-sort-asc');
        sortTableByColumn(tableElement, heraderIndex, !currentIsAscending);
    })
});

sortTableByColumn(document.querySelector("table"), 1);