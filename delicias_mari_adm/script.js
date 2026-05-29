import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

    const firebaseConfig = {
        apiKey: "AIzaSyBa6pHVlGgu9SD0dh5oI4Hp2krFAl65efI",
        authDomain: "delicias-mari-e8ea7.firebaseapp.com",
        projectId: "delicias-mari-e8ea7",
        storageBucket: "delicias-mari-e8ea7.firebasestorage.app",
        messagingSenderId: "971726636929",
        appId: "1:971726636929:web:14a7565247f880a5828a80",
        measurementId: "G-LDW1F38VPX"
    };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("FIREBASE CONECTADO");

/* FORM */
const form = document.querySelector('#add-cardap-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        await addDoc(collection(db, "cardapio"), {
            nome: form.nome.value,
            descricao: form.descricao.value,
            categoria: document.getElementById("categoria").value,
            imagem: form.imagem.value
        });

        form.reset();
        alert("Produto cadastrado!");

    } catch (error) {
        console.error("Erro:", error);
    }
});

//     /*RENDERIZAÇÃO DA LISTA DE DADOS*/
const listbook = document.querySelector('#cardap-list');


 function renderList(doc){
    
    let li = document.createElement('li');
    let nome = document.createElement('span');
    let descricao = document.createElement('span');
    let categoria = document.createElement('span');
    let imagem = document.createElement('span');

    // let excluir = document.createElement('div');
    
//     //CRIA UM ELEMENTO DE TEXTO "X" PARA AÇÃO DE EXCLUSÃO DE LIVROS
//     excluir.textContent = 'X';

     li.setAttribute('data-id', doc.id);   
    nome.textContent = doc.nome;
    descricao.textContent = doc.descricao;
    categoria.textContent = doc.categoria;
    imagem.textContent = doc.imagem;

    li.appendChild(nome);
    li.appendChild(descricao);
    li.appendChild(categoria);
    li.appendChild(imagem);

    listbook.appendChild(li);
}



/*LISTA DE DADOS DO COLEÇÃO DO FIREBASE*/
getDocs(collection(db, "cardapio"))
    .then((snapshot)=>{
        console.log(snapshot.docs)
        snapshot.docs.forEach(
            doc => {
                console.log(doc.data())
                renderList(doc.data())
            }
        )
    });