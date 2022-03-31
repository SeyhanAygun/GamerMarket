//Ürün bilgileri dizi tipindeki değişkenlere alındı.
let içDonanım=["ram","1500","anakart","3000","ekrankartı","8000","İşlemci","2750","SSD","750"];
let dışDonanım=["Klavye","700","Mause","350","Kulaklık","550","Monitör","3500","RGB Kasa","1350"];


//Döngü için sayaç değişkeni
let i;

//Kategori seçimine göre doldurulacak ürünlerin input ve label tanımı için
let urunAciklama,urunSecenek;

//Sepete eklenecek ürünlerin ve ürünlere ait fiyatların ayrı ayrı taşınması için
let eklenecekler=[];
let fiyatlar=[];

//Sepete ekleme,çıkarma ve boşaltma için sepet nesnesinin seçimi
let listeSepet=document.getElementById("sepetMarket");

//Ödenecek toplam tutarı başta sıfırlayarak tanımladık.
let toplamTutar=0;

//İndirim kodu için bir dizi veya değişken tanımlanabilir.
const kod="PROMO10";

//Kategori seçiminde ürünlerin güncellenmesi için olay yakalayıcı tanımlandı.
for(i=0;i<document.getElementsByName("kategori").length;i++)
{
    document.getElementsByName("kategori")[i].addEventListener("change",urunleriGetir);
}   

//Her kategori seçiminde gelecek ürünleri listeleyecek nesneler ve özellikleri tanımlandı
function olustur(){
    urunAciklama=document.createElement("label");
    urunSecenek=document.createElement("input");
    document.getElementById("urunPanel").appendChild(urunAciklama);
    document.getElementById("urunPanel").appendChild(urunSecenek);
    urunSecenek.type="checkbox";
    urunSecenek.setAttribute("name","urunler");
    urunAciklama.setAttribute("for","urunler");
    urunAciklama.setAttribute("class","urunler");
}

//Kategori seçimi yapıldıktan sonra ürün listesini(checkbox) doldurur.
function urunleriGetir(){
    //Ürün panelini her seferinde temizleyip yeniden doldurmak için 
    const silinecekler = document.getElementById("urunPanel");
    while (silinecekler.hasChildNodes()) {
      silinecekler.removeChild(silinecekler.firstChild);
    }

    //Her kategoriye ait ürün içeriklerini dizi üzerinden aldık.
    if(document.getElementById("içDonanım").checked)
    {
        for(i=0;i<içDonanım.length;i=i+2)
        {
            olustur();
            urunSecenek.value=içDonanım[i+1];
            urunAciklama.innerHTML=içDonanım[i]; 
        }
    }
    else if(document.getElementById("dışDonanım").checked)
    {
        for(i=0;i<dışDonanım.length;i=i+2)
        {
        olustur();
        urunSecenek.value=dışDonanım[i+1];
        urunAciklama.innerHTML=dışDonanım[i];
        }
    
    }
}

function sepeteEkle(){
    //Sepete eklenecek ürünleri alacağımız checkbox inputlar alındı.
    const listeUrunlerFiyat=document.getElementsByName("urunler");
    const listeUrunlerAd=document.getElementsByClassName("urunler");
    
    //Eklenecekler ve fiyatlar dizileri her ekleme sırasında sıfırlandı.
        eklenecekler=[];
        fiyatlar=[];

        //Checkbox inputlarının hepsi gezilerek seçili olanlar dizilere eklendi.
        for(i=0;i<listeUrunlerFiyat.length;i++){
            if(listeUrunlerFiyat[i].checked){
                toplamTutar+=Number(listeUrunlerFiyat[i].value);
                eklenecekler.push(listeUrunlerAd[i].innerHTML);
                fiyatlar.push(listeUrunlerFiyat[i].value);
            }
        }

        //Eklenecekleri ve fiyatlarını alabildik mi diye bir bakalım?
        console.log(eklenecekler);
        console.log(fiyatlar);

    //Eklenecek ürün adedi seçimi
    let adet=document.getElementById("urunAdet").value;
    console.log(adet);

    //Eklenecek ürün adedi kadar aynı işlemi tekrar et
    for(i=0;i<adet;i++)
    {
        let sepeteEklenecekUrun;
        //Eklenecekler listesindeki herbir ürün için liste elemanlarını oluştur.
        for(i=0;i<eklenecekler.length;i++){
            sepeteEklenecekUrun=document.createElement("option");
            listeSepet.options.add(sepeteEklenecekUrun);
            sepeteEklenecekUrun.text=eklenecekler[i];
            sepeteEklenecekUrun.value=fiyatlar[i];
        }
        /*
        eklenecekler.forEach(element => {
            sepeteEklenecekUrun=document.createElement("option");
            listeSepet.options.add(sepeteEklenecekUrun);
            sepeteEklenecekUrun.text=element;
            sepeteEklenecekUrun.value="Fiyat?";

        });
        */
    }

    //Ekleme işlemi yapılınca ara toplam tutarını yazdır.
    document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";
}

//Sepetten seçili ürünü indeks değerine bakarak siler.
function sepettenCikar(){
    //Seçili elemanın indeks sırasını ve valuesini alarak toplam tutardan düştük ve sildik.
    let seciliIndeks=listeSepet.selectedIndex;
    let silinecekUrununFiyati=listeSepet.options[seciliIndeks].value;
    listeSepet.options.remove(seciliIndeks);
    toplamTutar=toplamTutar-silinecekUrununFiyati;
    document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";
}

//Tüm ürünleri sözel döngü fonksiyonuyla gezerek
function sepetiBosalt(){
    document.querySelectorAll('#sepetMarket option').forEach(eleman => eleman.remove());
    toplamTutar=0;
    document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";

}

function koduEkle(){
    let girilenKod=document.getElementById("txtIndirim").value;
    if(girilenKod == kod)
    {
        toplamTutar=toplamTutar-10;
        document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";
        document.getElementById("sonuc").innerHTML="İndirim uygulandı.";
    }
    else{
        document.getElementById("sonuc").innerHTML="Geçerli bir kod girmediniz!";
    }
}



