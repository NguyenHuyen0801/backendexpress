
const users = async (req, res) => {
    res.render("admin/user/index");
};

const create = (req, res) => {
    res.render("admin/user/add_user")
};

const edit = (req, res) => {
    res.render("admin/user/edit_user")
};

const del = (req, res) => {
    res.render("Hi huyen!")
};

module.exports = {
    users: users,
    create: create,
    edit: edit,
    del: del,
}