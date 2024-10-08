const { UPDATE } = require('sequelize/lib/query-types');
const User = require('../models/User');

module.exports = {
    //metodo busca tudo de uma tabela de uma tabela especifica
    async index (req, res) {

        //o findAll serve para buscar tudo
        const users = await User.findAll();

       
        if (users == "" || users == null) {
            return res.status(200).send({ message: "Nenhum usuario cadastrado"});
        }


        
        return res.status(200).send({ users });
    },

 //salva
    async store (req, res){


    },

    async update (req, res){


    },
    
    async delete (req, res){


     }

}