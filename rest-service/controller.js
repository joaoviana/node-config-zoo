module.exports = (model) => {
	return {
		home: (req, res) => {
			res.send("here live " + model.name);
		},
		reset: (req, res) => {
			model.reset((err) => {
				if (err) {
					res.send(err);
				} else {
					res.send("successfully reset" + model.name);
				}
			})
		},
		getAdd: (req, res) => {
			res.send("post to this route with a \'new_entry\' in the body")
		},
		getAll: (req, res) => {
			model.read_all((err, everything) => {
				if (err) {
					res.send(err);
				} else {
					res.send(everything)
				}
			})
		},
		postAdd: (req, res) => {
			let new_entry = req.body.new_entry;
			model.create(new_entry, (err) => {
				if (err) {
					res.send(err);
				} else {
					res.send("successfully added " + new_entry + ' to ' + model.name);
				}
			});
		},
		getOne: (req, res) => {
			//res.send("post with an \'index\' property in the params");
			let index = req.params.id;
			model.read_one(index, (err, data) => {
				if (err) {
					console.log(err);
				} else {
					res.send(data)
				}
			});
		},
		getUpdate: (req, res) => {
			res.send("post with an \'index\' & \'new_entry\' property in the body");
		},
		postUpdate: (req, res) => {
			let index = req.params.id;
			let new_entry = res.body.new_entry;
			model.update(index, new_entry, (err, index, new_entry) => {
				if (err) {
					console.log(err);
				} else {
					res.send("item " + index + ": " + new_entry + " was successfully updated")
				}
			});
		},
		getDelete: (req, res) => {
			res.send("post with an \'index\' property in the body. we delete it");
		},
		postDelete: (req, res) => {
			let index = req.params.id;
			model.remove(index, (err, index, new_entry) => {
				if (err) {
					console.log(err);
				} else {
					res.send("item " + index + ": " + new_entry + " was successfully deleted")
				}
			});
		}

	}
}
