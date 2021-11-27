const index = (req, res) => {
    res.render("admin/categories/index")
};

const create = (req, res) => {
    res.render("admin/categories/add_category")
};

const edit = (req, res) => {
    res.render("admin/categories/edit_category")
};

const del = (req, res) => {
    res.status(200).json({
        
    })
};

module.exports = {
    index: index,
    create: create,
    edit: edit,
    del: del,
}