const kullaniciAdi = "recinilt";
const repoAdi = "gng";
const token = "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"; // document.getElementById("token").value;

async function writeToFile() {
  const filename = document.getElementById("filename").value;
  const message =  document.getElementById("message").value;

  try {
    // GitHub API'sini kullanarak dosyanın varlığını kontrol et
    let sha = null; // Dosya sha değeri, mevcut dosya yoksa null kalır
    try {
      const response = await fetch(`https://api.github.com/repos/${kullaniciAdi}/${repoAdi}/contents/${filename}`, {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        sha = data.sha; // Mevcut dosyanın SHA değerini al
      }
    } catch (err) {
      // Dosya bulunamadıysa burada hata alırız, ama bu hata normal çünkü dosyayı oluşturacağız
    }

    // Yeni içeriği UTF-8 olarak kodla ve Base64 formatına çevir
    let utf8Content = unescape(encodeURIComponent(message));
    let encodedContent = btoa(utf8Content);

    // Dosyayı oluştur veya güncelle
    const updateResponse = await fetch(`https://api.github.com/repos/${kullaniciAdi}/${repoAdi}/contents/${filename}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: sha ? 'Dosya güncellendi' : 'Yeni dosya oluşturuldu',
        content: encodedContent,
        sha: sha // Eğer dosya mevcut değilse, sha değerini null bırakıyoruz
      })
    });

    if (updateResponse.ok) {
      document.getElementById("output").innerText = sha
        ? "Dosya başarıyla güncellendi."
        : "Yeni dosya başarıyla oluşturuldu.";
    } else {
      document.getElementById("output").innerText = "Dosya işlenirken bir hata oluştu.";
    }
  } catch (error) {
    document.getElementById("output").innerText = "Bir hata oluştu: " + error;
  }
}


async function readFile() {
  //const token = document.getElementById("token").value;
  const filename = document.getElementById("filename").value;
    
  try {
    const response = await fetch(`https://api.github.com/repos/${kullaniciAdi}/${repoAdi}/contents/${filename}`, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    const data = await response.json();

    // Dosya içeriğini al ve base64 kodunu çöz
    //let content = data.content;
    //let decodedContent = atob(content);
    ///////
    // Dosya içeriğini al ve base64 kodunu çöz
    let content = data.content;
    let decodedContent = atob(content);

    // İçeriği UTF-8 olarak çöz
    let utf8Content = decodeURIComponent(escape(decodedContent));
    //const decoder = new TextDecoder('utf-8');
    //let utf8Content = decoder.decode(new Uint8Array(decodedContent));
    // Anahtarları çift tırnak içine alacak şekilde düzelt
    const duzeltilmisMetin = utf8Content.replace(/(\w+):/g, '"$1":'); 

    // JSON.parse ile nesneye dönüştür
    const myobj = JSON.parse(duzeltilmisMetin);
    document.getElementById("output").innerText = myobj.meyve;

    //document.getElementById("output").innerText = decodedContent;

  } catch (error) {
    document.getElementById("output").innerText = "Bir hata oluştu: " + error;
  }
}