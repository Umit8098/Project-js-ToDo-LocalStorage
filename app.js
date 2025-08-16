//* ======================================================
//*                     TODO APP
//* ======================================================

//! elementleri yakalayalım 
// const btn = document.querySelector('#todo-button');
const btn = document.getElementById('todo-button');
const todoInput = document.getElementById('todo-input');
const todoUl = document.getElementById('todo-ul');

//! sayfa yüklenince input focus olsun. Baslangicta input aktif olsun
window.onload = () => {
    todoInput.focus();
};

//! add butonuna tıklayınca todoInput'un değerini al ve todoUl'ye li olarak ekle
btn.addEventListener('click', (e) => {
    // console.log(todoInput.value);

    //! todoInput'un değerini boş ise hiçbir şey yapma
    // if (!todoInput.value) {
    //     alert('Lütfen bir todo giriniz!');
    //     return;
    // }
    if (!todoInput.value || todoInput.value.trim() === '') {
        alert('Lütfen bir todo giriniz!');
        return;
    }

    todoUl.innerHTML += `
    <li>
        <i class="fa fa-check"></i>
        <p>${todoInput.value}</p>
        <i class="fa fa-trash"></i>
    </li>`;
    todoInput.value = '';
});

//! Klavyeden enter tusuna basilmasi ile add butonunun click fonksiyonunun cagrilmasi
todoInput.addEventListener('keydown', (e) => {
    // console.log(e);
    // ! Enter'a basılırsa todoInput'un değerini al ve todoUl'ye ekle. Uzun versiyon
    // if (e.key === 'Enter') {
    //     todoUl.innerHTML += `
    //     <li>
    //         <i class="fa fa-check"></i>
    //         <p>${todoInput.value}</p>
    //         <i class="fa fa-trash"></i>
    //     </li>`;
    //     todoInput.value = '';
    // }
    //! klavyeden Enter'a basılırsa btn'un click fonksiyonunu çalıştır. Kısa versiyon
    if (e.key === 'Enter') {
        btn.click();
    }
});

//! delete ve ok icone'ları için event tanimlamasi
todoUl.addEventListener('click', (e) => {
    // console.log(e.target)
    //! Event, sil icon'undan geldi ise
    if (e.target.classList.contains('fa-trash')) {
        //! ilgili li elementini silerek DOM'u güncelle
        e.target.parentElement.remove();
    }

    //!Event, ok icon'undan geldi ise
    if (e.target.classList.contains('fa-check')) {
        //! ilgili li elementinde checked adinda bir class varsa bunu sil
        if (e.target.parentElement.classList.contains('checked')) {
            e.target.parentElement.classList.remove('checked');
        }
        //! ilgili li elementinde checked adinda bir class yoksa ekle
        else {
            e.target.parentElement.classList.add('checked');
        }
    }
});