function downloadLocalStorage() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        try {
            const value = JSON.parse(localStorage.getItem(key));
            // "name" ve "unitCount" alanlarını kontrol et
            if (value && typeof value === 'object' && 'name' in value && 'unitCount' in value) {
                data[key] = value;
            }
        } catch (e) {
            // JSON.parse hata verirse (örneğin, değer JSON değilse), devam et
            continue;
        }
    }
    const jsonData = JSON.stringify(data, null, 2); // Daha okunabilir format için null ve 2 eklendi
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'filteredLocalStorage.json';
    a.click();
    scannerInput.focus();
}
