import { Form, Link } from "react-router-dom";

export function PostForm({
  users,
  defaultValues = {},
  method,
  isSubmiting,
  errors = {},
}) {
  return (
    <Form method={method} action="/posts/new" className="form">
      <div className="form-row">
        <div className="form-group error">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={defaultValues.title}
          />
          <div className="error-message">Required</div>
        </div>

        <div className="form-group">
          <label htmlFor="userId">Author</label>
          <select name="userId" id="userId" defaultValue={defaultValues.userid}>
            {users.map((user) => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="body">Body</label>
          <textarea
            name="body"
            id="body"
            defaultValue={defaultValues.body}
          ></textarea>
        </div>
      </div>
      <div className="form-row form-btn-row">
        <Link className="btn btn-outline" to="..">
          Cancel
        </Link>
        <button disabled={isSubmiting} className="btn">
          {isSubmiting ? "Saving... " : "Save"}
        </button>
      </div>
    </Form>
  );
}

export function postFormValidator({ title, body, userId }) {
  let errors = {};
  if (title === "") errors = "Required";
  if (body === "") errors = "Required";
  if (userId === "") errors = "Required";

  return errors;
}
