module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      job: String,
      address: String,
      phone: Number,
      hasKids: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id; // _id ---> id
    return object;
  });

  const Person = mongoose.model("Person", schema);
  return Person;
};

