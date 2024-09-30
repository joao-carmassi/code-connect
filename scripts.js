const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");
const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");
const botaoPublicar = document.querySelector(".botao-publicar");

uploadBtn.addEventListener("click", () => {
  inputUpload.click();
});

function lerConteudoDoArquivo(arquivo) {
  return new Promise((resolve, rejects) => {
    const leitor = new FileReader();
    leitor.onload = () => {
      resolve({ url: leitor.result, nome: arquivo.name });
    };

    leitor.onerror = () => {
      rejects(`Erro na leitura do arquivo ${arquivo.name}`);
    };

    leitor.readAsDataURL(arquivo);
  });
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (e) => {
  const arquivo = e.target.files[0];

  if (arquivo) {
    try {
      const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
      imagemPrincipal.src = conteudoDoArquivo.url;
      nomeDaImagem.textContent = conteudoDoArquivo.nome;
    } catch (error) {
      console.error(`Erro na leitura do arquivo. Error: ${error}`);
    }
  }
});

listaTags.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-tag")) {
    const tagARemover = e.target.parentElement;
    tagARemover.remove();
  }
});

const tagsDisponiveis = [
  "Front-end",
  "Programação",
  "Data Science",
  "Full-stack",
  "Html",
  "Css",
  "Javascript",
];

async function verificaTagsDisponiveis(tagTexto) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tagsDisponiveis.includes(tagTexto));
    });
  }, 1000);
}

inputTags.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const tagTexto = inputTags.value.trim();
    if (tagTexto !== "") {
      try {
        const tagExiste = await verificaTagsDisponiveis(tagTexto);
        if (tagExiste) {
          const tagNova = document.createElement("li");
          tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
          listaTags.appendChild(tagNova);
          inputTags.value = "";
        } else {
          alert("Tag não foi encontrada");
        }
      } catch (error) {
        console.error(
          `Erro vao verificar a existencia da tag. Error: ${error}`
        );
        alert("Erro ao verifcar a existencia da tag. Varifique o console");
      }
    }
  }
});

async function publicarProjetos(
  nomedoProjeto,
  descricaoDoProjeto,
  tagsProjeto
) {
  return new Promise((resolve, rejects) => {
    setTimeout(() => {
      const deuCerto = Math.random() > 0.5;

      if (deuCerto) {
        resolve("Projeto publicado com sucesso");
      } else {
        rejects("Erro ao publicar o projeto.");
      }
    }, 2000);
  });
}

botaoPublicar.addEventListener("click", async (event) => {
  event.preventDefault();
  const nomeDoProjeto = document.getElementById("nome").value;
  const descricaoDoProjeto = document.getElementById("descricao").value;
  const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map(
    (tag) => tag.textContent
  );

  try {
    const resultado = await publicarProjetos(
      nomeDoProjeto,
      descricaoDoProjeto,
      tagsProjeto
    );
    console.log(resultado);
    alert("Deu tudo certo");
  } catch (error) {
    console.log(`Deu errado ${error}`);
    alert("Deu tudo errado");
  }
});

const botaoDescartar = document.querySelector(".botao-descartar");

botaoDescartar.addEventListener("click", (e) => {
  e.preventDefault();

  const form = document.querySelector("form");
  form.reset();

  imagemPrincipal.src = "./img/imagem1.png";
  nomeDaImagem.textContent = "image_projeto.png";

  listaTags.innerHTML = "";
});
