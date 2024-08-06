"use client";

import { signupHandler } from "@/actions/authActions";

const SignupForm = () => {
  return (
    <form
      action={async (formData) => {
        await signupHandler(formData);
      }}
    >
      <div className="mb-3">
        <label className="form-label" htmlFor="card-name">
          Name
        </label>
        <input
          className="form-control"
          type="text"
          name="name"
          autoComplete="on"
          id="card-name"
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="card-email">
          Email address
        </label>
        <input
          className="form-control"
          type="email"
          name="email"
          autoComplete="on"
          id="card-email"
        />
      </div>
      <div className="row gx-2">
        <div className="mb-3 col-sm-6">
          <label className="form-label" htmlFor="card-password">
            Password
          </label>
          <input
            name="password"
            className="form-control"
            type="password"
            autoComplete="on"
            id="card-password"
          />
        </div>
        <div className="mb-3 col-sm-6">
          <label className="form-label" htmlFor="card-confirm-password">
            Confirm Password
          </label>
          <input
            className="form-control"
            type="password"
            name="confirmPassword"
            autoComplete="on"
            id="card-confirm-password"
          />
        </div>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="card-register-checkbox"
        />
        <label className="form-label" htmlFor="card-register-checkbox">
          I accept the <a href="#!">terms </a>and{" "}
          <a className="white-space-nowrap" href="#!">
            privacy policy
          </a>
        </label>
      </div>
      <div className="mb-3">
        <button
          className="btn btn-primary d-block w-100 mt-3"
          type="submit"
          name="submit"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
