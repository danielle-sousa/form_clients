var crudApp = new function () {

        // Listagem de clientes
        this.myClients = [
            { ID: '1', Nome_Cliente: 'Maria dos Santos', Categoria: 'Pessoa Física', Email: 'msantos@gmail.com', CPF: '125.604.600-22', Telefone: 991058847, CEP: 08090284, Logradouro: 'Rua 03 de Outubro', Numero: 320, Bairo: 'Jardim Helena', Cidade: 'São Paulo', Estado: 'SP' },
            { ID: '2', Nome_Cliente: 'João da Silva', Categoria: 'Pessoa Física', Email: 'jsilva@gmail.com', CPF: '560.001.444-10', Telefone: 998542300, CEP: 04849529, Logradouro: 'Rua 13 de Maio', Numero: 42, Bairo: 'Cantinho do Céu', Cidade: 'São Paulo', Estado: 'SP' },
            { ID: '3', Nome_Cliente: 'José Oliveira', Categoria: 'Pessoa Física', Email: 'joliveira@gmail.com', CPF: '210.407.987-05', Telefone: 990215216, CEP: 03047000, Logradouro: 'Rua 21 de Abril', Numero: 106, Bairo: 'Brás', Cidade: 'São Paulo', Estado: 'SP' }
        ]

        this.category = ['Pessoa Física', 'Pessoa Jurídica'];
        this.col = [];

        this.createTable = function () {

            for (var i = 0; i < this.myClients.length; i++) {
                for (var key in this.myClients[i]) {
                    if (this.col.indexOf(key) === -1) {
                        this.col.push(key);
                    }
                }
            }

            // Criando a tabela.
            var table = document.createElement('table');
            table.setAttribute('id', 'formClients');     //Atribuindo o ID

            var tr = table.insertRow(-1);               

            for (var h = 0; h < this.col.length; h++) {
                // Adicionando o header da tabela.
                var th = document.createElement('th');
                th.innerHTML = this.col[h].replace('_', ' ');
                tr.appendChild(th);
            }

            // Adicionando as linhas.
            for (var i = 0; i < this.myClients.length; i++) {

                tr = table.insertRow(-1);           // Cria nova linha.

                for (var j = 0; j < this.col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = this.myClients[i][this.col[j]];
                }

                this.td = document.createElement('td');

                // Cancelar.
                tr.appendChild(this.td);
                var lblCancel = document.createElement('label');
                lblCancel.innerHTML = '✖';
                lblCancel.setAttribute('onclick', 'crudApp.Cancel(this)');
                lblCancel.setAttribute('style', 'display:none;');
                lblCancel.setAttribute('title', 'Cancel');
                lblCancel.setAttribute('id', 'lbl' + i);
                this.td.appendChild(lblCancel);

                // Salvar.
                tr.appendChild(this.td);
                var btSave = document.createElement('input');

                btSave.setAttribute('type', 'button');      
                btSave.setAttribute('value', 'Salvar');
                btSave.setAttribute('id', 'Save' + i);
                btSave.setAttribute('style', 'display:none;');
                btSave.setAttribute('onclick', 'crudApp.Save(this)');      
                this.td.appendChild(btSave);

                // Atualizar.
                tr.appendChild(this.td);
                var btUpdate = document.createElement('input');

                btUpdate.setAttribute('type', 'button');    
                btUpdate.setAttribute('value', 'Atualizar');
                btUpdate.setAttribute('id', 'Edit' + i);
                btUpdate.setAttribute('style', 'background-color:#44CCEB;');
                btUpdate.setAttribute('onclick', 'crudApp.Update(this)');   
                this.td.appendChild(btUpdate);

                // Excluir.
                this.td = document.createElement('th');
                tr.appendChild(this.td);
                var btDelete = document.createElement('input');
                btDelete.setAttribute('type', 'button');    
                btDelete.setAttribute('value', 'Excluir');
                btDelete.setAttribute('style', 'background-color:#ED5650;');
                btDelete.setAttribute('onclick', 'crudApp.Delete(this)');   
                this.td.appendChild(btDelete);
            }


            // Novo cadastro

            tr = table.insertRow(-1);           

            for (var j = 0; j < this.col.length; j++) {
                var newCell = tr.insertCell(-1);
                if (j >= 1) {

                    if (j == 2) {   

                        var select = document.createElement('select');      
                        select.innerHTML = '<option value=""></option>';
                        for (k = 0; k < this.category.length; k++) {
                            select.innerHTML = select.innerHTML +
                                '<option value="' + this.category[k] + '">' + this.category[k] + '</option>';
                        }
                        newCell.appendChild(select);
                    }
                    else {
                        var tBox = document.createElement('input');          
                        tBox.setAttribute('type', 'text');
                        tBox.setAttribute('value', '');
                        newCell.appendChild(tBox);
                    }
                }
            }

            this.td = document.createElement('td');
            tr.appendChild(this.td);

            var btNew = document.createElement('input');

            btNew.setAttribute('type', 'button');       
            btNew.setAttribute('value', 'Adicionar');
            btNew.setAttribute('id', 'New' + i);
            btNew.setAttribute('style', 'background-color:#207DD1;');
            btNew.setAttribute('onclick', 'crudApp.CreateNew(this)');       
            this.td.appendChild(btNew);

            var div = document.getElementById('container');
            div.innerHTML = '';
            div.appendChild(table);    // Adiciona a tabela na página
        };


        // Cancelar.
        this.Cancel = function (oButton) {

            // Esconder o botão cancelar
            oButton.setAttribute('style', 'display:none; float:none;');

            var activeRow = oButton.parentNode.parentNode.rowIndex;

            // Esconder o botão salvar.
            var btSave = document.getElementById('Save' + (activeRow - 1));
            btSave.setAttribute('style', 'display:none;');

            // Mostra o botão atualizar.
            var btUpdate = document.getElementById('Edit' + (activeRow - 1));
            btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color:#44CCEB;');

            var tab = document.getElementById('formClients').rows[activeRow];

            for (i = 0; i < this.col.length; i++) {
                var td = tab.getElementsByTagName("td")[i];
                td.innerHTML = this.myClients[(activeRow - 1)][this.col[i]];
            }
        }


        // Editar
        this.Update = function (oButton) {
            var activeRow = oButton.parentNode.parentNode.rowIndex;
            var tab = document.getElementById('formClients').rows[activeRow];

            for (i = 1; i < 12; i++) {
                if (i == 2) {
                    var td = tab.getElementsByTagName("td")[i];
                    var ele = document.createElement('select');      
                    ele.innerHTML = '<option value="' + td.innerText + '">' + td.innerText + '</option>';
                    for (k = 0; k < this.category.length; k++) {
                        ele.innerHTML = ele.innerHTML +
                            '<option value="' + this.category[k] + '">' + this.category[k] + '</option>';
                    }
                    td.innerText = '';
                    td.appendChild(ele);
                }
                else {
                    var td = tab.getElementsByTagName("td")[i];
                    var ele = document.createElement('input');      
                    ele.setAttribute('type', 'text');
                    ele.setAttribute('value', td.innerText);
                    td.innerText = '';
                    td.appendChild(ele);
                }
            }

            var lblCancel = document.getElementById('lbl' + (activeRow - 1));
            lblCancel.setAttribute('style', 'cursor:pointer; display:block; width:20px; float:left; position: absolute;');

            var btSave = document.getElementById('Save' + (activeRow - 1));
            btSave.setAttribute('style', 'display:block; margin-left:30px; float:left; background-color:#2DBF64;');

            // Esconder o botão.
            oButton.setAttribute('style', 'display:none;');
        };


        // Deletar
        this.Delete = function (oButton) {
            var activeRow = oButton.parentNode.parentNode.rowIndex;
            this.myClients.splice((activeRow - 1), 1);    // Deleta a linha 
            this.createTable();                         // Atualiza a tabela
        };

        // Salvar.
        this.Save = function (oButton) {
            var activeRow = oButton.parentNode.parentNode.rowIndex;
            var tab = document.getElementById('formClients').rows[activeRow];

            // Atualiza a lista.
            for (i = 1; i < this.col.length; i++) {
                var td = tab.getElementsByTagName("td")[i];
                if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {  
                    this.myClients[(activeRow - 1)][this.col[i]] = td.childNodes[0].value;     
                }
            }
            this.createTable();    
        }

        // Criar nova entrada.
        this.CreateNew = function (oButton) {
            var activeRow = oButton.parentNode.parentNode.rowIndex;
            var tab = document.getElementById('formClients').rows[activeRow];
            var obj = {};

            // Adicionando novo dado.
            for (i = 1; i < this.col.length; i++) {
                var td = tab.getElementsByTagName("td")[i];
                if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {     
                    var txtVal = td.childNodes[0].value;
                    if (txtVal != '') {
                        obj[this.col[i]] = txtVal.trim();
                    }
                    else {
                        obj = '';
                        alert('Todos os campos são obrigatórios!');
                        break;
                    }
                }
            }
            obj[this.col[0]] = this.myClients.length + 1;     // Novo ID.

            if (Object.keys(obj).length > 0) {      // Verifica se campo não está vazio.
                this.myClients.push(obj);             // Adiciona dado no array.
                this.createTable();                 // Atualiza a tabela.
            }
        }
}

    crudApp.createTable();