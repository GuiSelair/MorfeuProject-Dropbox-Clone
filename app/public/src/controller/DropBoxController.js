
/*
 *  CLASSE CONTROLLER RESPONSAVEL POR CONTROLAR TODAS AS CLASSES 
 */

class DropBoxController{

    constructor(){
        // Busca o botão de enviar pelo ID 
        this.sendButtonEl = document.querySelector("#btn-send-file")
        // BUSCA O BOTÃO DE INPUT PELO ID
        this.inputFilesEl = document.querySelector("#files")
        // BUSCA O MODAL QUE EXIBE O CARREGAMENTO DO ARQUIVO PELO ID
        this.modalFilesProcessEl = document.querySelector("#react-snackbar-root")

        //  INICIA TODOS OS EVENTOS PRIMARIOS
        this.initEvents()
    }

    initEvents(){
        this.sendButtonEl.addEventListener("click", (event) => {
            /*
             *  QUANDO O BOTÃO É CLICADO, É ABERTO A TELA DE INPUT.
             *  ESTE INPUT FICA OCULTO NO ARQUIVO ejs PORÉM COM O .click ELE SERÁ EXECUTADO 
             */
            this.inputFilesEl.click()
        })

        //  QUANDO ALGUM ARQUIVO FOR SELECIONADO ELE IRÁ ACIONAR O MODAL
        this.inputFilesEl.addEventListener("change", event => {
            this.uploadTask(event.target.files)
            this.modalFilesProcessEl.style.display = "block"
        })
    }

    uploadTask(files){
        let promises = [];
        /*
         *  COMO O event.target.files É CONSIDERADO UMA COLEÇÃO TRANSFORMAMOS EM UMA LISTA
         *  USANDO O [...files]
         * 
         *  CRIAREMOS UMA PROMISE PARA CADA ARQUIVO COLOCANDO-OS EM UMA LISTA. 
         *  DEIXAREMOS O Promise.all GERENCIAR SE TUDO DEU CERTO OU SE ALGUM ARQUIVO FALHOU.
         */
        [...files].forEach(file => {
            promises.push(new Promise((resolve, reject) => {
                /*
                 * ABRINDO REQUISIÇÕES ASSICRONAS VIA AJAX
                 * SE COMUNICANDO COM O SERVIDOR
                 */
                let ajax = new XMLHttpRequest()
                ajax.open("POST", "/upload")
                ajax.onload = event => {
                    try {
                        resolve(JSON.parse(ajax.responseText))
                    }
                    catch (error) {
                        reject(error)
                    }
                }
                ajax.onerror = error => {
                    reject(error)
                }

                // PRECISANDO USAR O FormData() PARA ENVIAR OS ARQUIVOS VIA AJAX
                let formData = new FormData()
                formData.append("input-file", file)
                ajax.send(formData)
            }))
        });


        return Promise.all(promises)
    }
}