class Authentication {
  async registerUser({
    fullName,
    userName,
    email,
    gender,
    password,
    confirmPassword,
    profileimage = "",
  }) {
    try {
      const formdata = new FormData();
      formdata.append("fullName", fullName);
      formdata.append("userName", userName);
      formdata.append("email", email);
      formdata.append("gender", gender);
      formdata.append("profileImage", new File([profileimage], ""));
      formdata.append("password", password);
      formdata.append("confirmPassword", confirmPassword);
      const res = await (
        await fetch("http://localhost:8080/api/v1/users/signup", {
          method: "POST",
          credentials: "include",
          headers: {
            accept: "application/json",
          },
          body: formdata,
        })
      ).json();
      // after successful registration login  user with the password and username
      if (res.statusCode === 200) {
        const response = await this.signIn({ username: userName, password });
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async signIn({ username, password }) {
    try {
      return await (
        await fetch("http://localhost:8080/api/v1/users/signin", {
          method: "POST",
          credentials: "include",  
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        })
      ).json();
    } catch (error) {
      console.log(error);
    }
  }
  async logout() {
    try {
      return await (
        await fetch("http://localhost:8080/api/v1/users/signout", {
          method: "POST",
          credentials: "include",
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
      ).json();
    } catch (error) {
      console.log(error);
    }
  }
  async currentUser() {
    try {
      return await (
        await fetch("http://localhost:8080/api/v1/users/currentUser", {
          method: "GET",
          credentials: "include",
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
      ).json();
    } catch (error) {
      console.log(error);
    }
  }
  async getAllUser() {
    try {
      return await (
        await fetch("http://localhost:8080/api/v1/users", {
          method: "GET",
          credentials: "include",
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
      ).json();
    } catch (error) {
      console.log(error);
    }
  }
}
const auth = new Authentication();
export default auth;
