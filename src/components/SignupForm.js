import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container, Snackbar } from "@mui/material";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");

    // Add your validation logic here
    if (!username) {
      setUsernameError("Username is required");
    } else {
      setUsernameError("");
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }

    if (username && email && password && password === confirmPassword) {
      try {
        const response = await fetch(
          "https://kk9fdc-3000.csb.app/auth/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              email,
              password,
              confirmPassword,
            }),
          },
        );

        const responseData = await response.json();

        setSnackbarSeverity(response.ok ? "success" : "error");
        console.log(responseData);
        setSnackbarMessage(
          responseData.message
            ? responseData.message
            : console.log(responseData),
        );
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error occurred while fetching data:", error);
        setSnackbarSeverity("error");
        setSnackbarMessage("An error occurred while processing your request.");
        setSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                error={!!usernameError}
                helperText={usernameError}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={!!emailError}
                helperText={emailError}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={!!passwordError}
                helperText={passwordError}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/" variant="body2">
                    Already have an account? Log In
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Container>
  );
}
