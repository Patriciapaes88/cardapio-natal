// Dados do cardápio (você pode puxar de um backend depois)
const MENU_ITEMS = [
{
  id: 1,
  nome: "Lasanha natalina",
  categoria: "principais",
  preco: 120.00,
  destaque: true,
  imagem: "lasanha.jpeg",
  descricao: "Lasanha recheada com molho especial e queijo gratinado."
},
  
    {
  id: 2,
  nome: "Arroz à grega",
  categoria: "principais",
  preco: 45.00,
  destaque: false,
  imagem: "arroz_grega.jpeg", 
  descricao: "Arroz colorido com legumes frescos, passas e temperos especiais, perfeito para acompanhar a ceia."
},

  {
    id: 3,
    nome: "Salpicão natalino",
    categoria: "entradas",
    preco: 39.90,
    destaque: false,
    imagem: "salpicao.jpeg",
    descricao: "Frango desfiado, legumes crocantes e toque de maçã verde."
  },
{
  id: 4,
  nome: "Pudim",
  categoria: "sobremesas",
  preco: 29.90,
  destaque: false,
  imagem: "pudim.JPG", // caminho da imagem
  descricao: "Clássico pudim de leite condensado com calda de caramelo."
},

{
  id: 5,
  nome: "Farofa agridoce",
  categoria: "principais",
  preco: 35.00,
  destaque: false,
  imagem: "farofa_agridoce.jpeg",
  descricao: "Farofa crocante com frutas secas e toque agridoce."
},
{
  id: 6,
  nome: "Pavê",
  categoria: "sobremesas",
  preco: 45.00,
  destaque: true,
  imagem: "pave.jpeg",
  descricao: "Camadas de biscoito, creme ou chocolate."
},
{
  id: 7,
  nome: "Salada de maionese",
  categoria: "entradas",
  preco: 29.90,
  destaque: false,
  imagem: "maionese.jpeg",
  descricao: "Batata, cenoura, ervilha e maionese cremosa, servida como entrada leve e refrescante."
},
{
  id: 8,
  nome: "Nhoque caseiro",
  categoria: "principais",
  preco: 85.00,
  destaque: false,
  imagem: "nhoque.jpeg",
  descricao: "Nhoque macio servido com molho de tomate e manjericão."
},
{
  id: 9,
  nome: "Coxa e sobrecoxa com bacon",
  categoria: "principais",
  preco: 99.00,
  destaque: false,
  imagem: "coxasobrecoxa.jpeg",
  descricao: "Frango assado envolto em fatias de bacon crocante."
}


];

const grid = document.getElementById("menuGrid");
const searchInput = document.getElementById("searchInput");
const chips = document.querySelectorAll(".chip");

let state = {
  categoria: "todos",
  busca: ""
};

function formatBRL(valor){
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function render(){
  const termo = state.busca.trim().toLowerCase();
  const categoria = state.categoria;

  const filtrados = MENU_ITEMS.filter(item => {
    const matchBusca =
      !termo ||
      item.nome.toLowerCase().includes(termo) ||
      item.descricao.toLowerCase().includes(termo);

    const matchCategoria = categoria === "todos" || item.categoria === categoria;

    return matchBusca && matchCategoria;
  });

  grid.innerHTML = filtrados.map(item => `
    <article class="card">
      <img src="${item.imagem}" alt="${item.nome}">
      <div class="card-content">
        <div class="title">
          <h3>${item.nome}</h3>
          ${item.destaque ? `<span class="badge">Destaque</span>` : ""}
        </div>
        <p class="desc">${item.descricao}</p>
        <div class="meta">
          <span class="price">${formatBRL(item.preco)}</span>
          <span class="tag">${labelCategoria(item.categoria)}</span>
        </div>
      </div>
    </article>
  `).join("");

  if (filtrados.length === 0){
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; color:#777; padding:20px;">
        Nenhum item encontrado. Tente outro termo ou categoria.
      </div>`;
  }
}

function labelCategoria(cat){
  const map = {
    entradas: "Entrada",
    principais: "Principal",
    sobremesas: "Sobremesa",

  };
  return map[cat] || cat;
}

searchInput.addEventListener("input", (e) => {
  state.busca = e.target.value;
  render();
});

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    state.categoria = chip.dataset.category;
    render();
  });
});

// Inicializa
render();
