//* ======================================================
//*                     TODO APP - Local Storage
//* ======================================================

//! elementleri yakalayalım 
// const btn = document.querySelector('#todo-button');
const btn = document.getElementById('todo-button');
const todoInput = document.getElementById('todo-input');
const todoUl = document.getElementById('todo-ul');

//? LOCAL STORAGE
//! Local Storage'a kayıt için başlangıçta boş bir todos dizisi oluşturalım
// let todos = []; //! başlangıçta todos dizisi boş

//! Local Storage'dan verileri çekip todos'a ekleyelim
let todos = JSON.parse(localStorage.getItem('todos')) || []; //! Local Storage'dan verileri çekiyoruz, eğer veri yoksa boş bir dizi kullanıyoruz

// ! Local Storage'dan verileri çektiğimizde, sayfa yüklendiğinde bu verileri render edelim
renderSavedTodos();

function renderSavedTodos() {
    // console.log(todos);
    todos.forEach(todo => {
        createListElement(todo);
    });
};

function createListElement(todo) {
    const {id, content, isDone} = todo; //! destructuring ile todo'dan id, isDone ve content değerlerini alıyoruz
        todoUl.innerHTML += `
        <li id=${id} class=${isDone ? 'checked' : ''}>
            <i class="fa fa-check"></i>
            <p>${content}</p>
            <i class="fa fa-trash"></i>
        </li>`;
};


//! sayfa yüklenince input focus olsun. Baslangicta input aktif olsun
window.onload = () => {
    todoInput.focus();
};


//! add butonuna tıklayınca todoInput'un değerini al ve todoUl'ye li olarak ekle
btn.addEventListener('click', () => {
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

    //! Local Storage'a kaydetmek için add ile oluşturacağımız todo'yu önce object haline getiriyoruz
    const todoObject = {
      id: new Date().getTime(), //! unique id için tarih/saat bilgisini kullanıyoruz
      isDone: false, //! başlangıçta todo yapılmamış
      content: todoInput.value,
    };

    //! todos dizisine yeni todo'yu ekliyoruz
    todos.push(todoObject); 
    //! todos dizisini Local Storage'a kaydediyoruz. verimiz obje olduğu için JSON.stringify ile string'e çeviriyoruz.
    localStorage.setItem('todos', JSON.stringify(todos)); 

    createListElement(todoObject);
    
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

    //! silinecek li elementinin id'sini alıyoruz
    // const id = e.target.parentElement.id; 
    const id = e.target.parentElement.getAttribute('id'); //! getAttribute ile id'yi alıyoruz
    
    //! Event, sil icon'undan geldi ise
    if (e.target.classList.contains('fa-trash')) {

        //! ilgili li elementinin id'sini localStorage için kullandığımız todos dizisinden sil
        todos = todos.filter((todo) => todo.id != id); //! filter ile todos dizisinden silmek istediğimiz todo'yu çıkartıyoruz

        //! güncellenmiş todos dizisini Local Storage'a kaydediyoruz
        localStorage.setItem('todos', JSON.stringify(todos));
        // console.log(todos);

        //! ilgili li elementini silerek DOM'u güncelle
        e.target.parentElement.remove();
    }

    //!Event, ok icon'undan geldi ise
    if (e.target.classList.contains('fa-check')) {

        //! ilgili li elementinin id'sini todos dizisinde bul ve isDone değerini değiştir
        todos.map((todo, index) => {
            //! eğer todo'nun id'si silinecek olan id ise isDone değerini değiştir
            if (todo.id == id) {
                todos[index].isDone = !todos[index].isDone; //! isDone değerini tersine çevir
            }
        });

        //! güncellenmiş todos dizisini Local Storage'a kaydediyoruz
        localStorage.setItem('todos', JSON.stringify(todos));


        //! ilgili li elementinde checked adında bir class varsa bunu sil (DOM)
        if (e.target.parentElement.classList.contains('checked')) {
            e.target.parentElement.classList.remove('checked');
        }
        //! ilgili li elementinde checked adında bir class yoksa ekle
        else {
            e.target.parentElement.classList.add('checked');
        }
    }
});