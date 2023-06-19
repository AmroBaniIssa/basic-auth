class Collection {
    constructor(model) {
        this.model = model;
    }
    async add(obj) {
        let newRecord = await this.model.create(obj);
        return newRecord;
    }
    async read(data_id) {
        let records = null;
        if (data_id) {
            records = await this.model.findOne({ where: { id: data_id } });

        } else {
            records = await this.model.findAll();
        }
        return records;
    }
    async update(obj, data_id) {
        let foundAuthor = await this.model.findOne({ where: { id: data_id } });
        let updatedAuthor = await foundAuthor.update(obj);
        return updatedAuthor;
    }
    async delete(data_id) {
        let record = await this.model.destroy({ where: { id: data_id } });
        return record;
    }
   
       async readAuthorBooks(id,model) {
        let record = await this.model.findAll({
            where: { authorId: id },
            include: model,
        })

        return record;
    }

    // async readAuthorBooks(id, model) {
    //     let record = await this.model.findOne({
    //         where: { id },
    //         include: model,
    //     });
    //     return record;
    // }

}

module.exports = Collection;