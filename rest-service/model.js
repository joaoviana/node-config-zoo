let jsonfile = require('jsonfile');

module.exports = (name,db_path) => {
  let methods = {
		reset: function (cb) {
			let db = require(this.db_path);
			db.data[this.name] = {};
			jsonfile.writeFile(this.db_path, db, cb);
		},
		create: function (new_entry, cb) {
			let db = require(this.db_path);
			let this_data = db.data[this.name];

			this_data[this.nextID] = new_entry;
			let cb2 = (err) => {
				cb(err, this.nextID, new_entry);
			}
			this.nextID++;
			db.data[this.name] = this_data
			jsonfile.writeFile(this.db_path, db, cb2);
		},
		read_one: function (index, cb) {
			let db = require(this.db_path);
			let this_data = db.data[this.name];

			if (this_data[index]) {
				cb(null, this_data[index]);
			} else {
				cb("this index is undefined");
			}
		},
		read_all: function (cb) {
			let db = require(this.db_path);
			let this_data = db.data[this.name];

			if (this_data) {
				cb(null, this_data);
			} else {
				cb("this collection does not exist");
			}
		},
		update: function (index, new_entry, cb) {
			let db = require(this.db_path);
			let this_data = db.data[this.name];

			let cb2;
			if (this_data[index]) {
				this_data[index] = new_entry;
				db.data[this.name] = this_data;
				cb2 = (err) => {
					cb(err, index, new_entry);
				};
				jsonfile.writeFile(this.db_path, db, cb2)
			} else {
				cb("this collection does not exist");
			}
		},
		remove: function (index, cb) {
			let db = require(this.db_path);
			let this_data = db.data[this.name];

			let cb2;
			if (this_data[index]) {
				delete this_data[index];
				db.data[this.name] = this_data;
				cb2 = (err) => {
					cb(err, index, this_data[index]);
				};
				jsonfile.writeFile(this.db_path, db, cb2)
			} else {
				cb("this collection does not exist");
			}
		}
	};

  let model_instance = Object.create(methods);
  model_instance.name = name;
  model_instance.db_path = db_path;
  model_instance.nextID = 0;
  return model_instance;
};
