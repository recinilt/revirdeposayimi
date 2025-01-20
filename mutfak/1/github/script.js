const kullaniciAdi = "recinilt";
const repoAdi = "gng";
const token = "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"; // document.getElementById("token").value;

async function writeToFile() {
  
  const filename = document.getElementById("filename").value;
  const message = document.getElementById("message").value;

  try {
    // GitHub API'sini kullanarak dosyayı al
    const response = await fetch(`https://api.github.com/repos/${kullaniciAdi}/${repoAdi}/contents/${filename}`, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    const data = await response.json();

    // Dosya içeriğini al (base64 kodlanmış)
    let content = data.content;
    let sha = data.sha;

    // Base64 kodunu çöz ve mesajı ekle
    let decodedContent = atob(content);
    //let mydecodedContent = unescape(encodeURIComponent(decodedContent));
    let mydecodedContent = decodeURIComponent(escape(decodedContent));
    let newContent = mydecodedContent + "\n" + message;

    // Yeni içeriği base64 olarak kodla
    //let encodedContent = btoa(newContent);
    // Yeni içeriği UTF-8 olarak kodla
    let utf8Content = unescape(encodeURIComponent(newContent));

    // UTF-8 kodlanmış içeriği base64 olarak kodla
    let encodedContent = btoa(utf8Content);

    // Dosyayı güncelle
    const updateResponse = await fetch(`https://api.github.com/repos/${kullaniciAdi}/${repoAdi}/contents/${filename}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: 'Dosya güncellendi',
        content: encodedContent,
        sha: sha
      })
    });

    if (updateResponse.ok) {
      document.getElementById("output").innerText = "Dosya başarıyla güncellendi.";
    } else {
      document.getElementById("output").innerText = "Dosya güncellenirken bir hata oluştu.";
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

    document.getElementById("output").innerText = utf8Content;

    //document.getElementById("output").innerText = decodedContent;

  } catch (error) {
    document.getElementById("output").innerText = "Bir hata oluştu: " + error;
  }
}