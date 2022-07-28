import React, {useState} from "react";
import ReactGA from "react-ga";
import Head from "next/head";
import axios from "axios";
import Link from "../src/Link";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    Grid,
    makeStyles,
    Snackbar,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from "@material-ui/core";

import ButtonArrow from "../src/ui/ButtonArrow";

const useStyles = makeStyles(theme => ({
    background: {
        backgroundImage: `url("/assets/longJon.jpg")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "60em",
        paddingBottom: "10em",
        [theme.breakpoints.down("md")]: {
            backgroundImage: `url("/assets/longJonMobile.jpg")`
        }
    },
    estimateButton: {
        ...theme.typography.estimate,
        borderRadius: 50,
        height: 80,
        width: 205,
        backgroundColor: theme.palette.common.orange,
        fontSize: "1.5rem",
        marginRight: "5em",
        marginLeft: "2em",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        },
        [theme.breakpoints.down("md")]: {
            marginLeft: 0,
            marginRight: 0
        }
    },
    learnButton: {
        ...theme.typography.learnButton,
        fontSize: "0.7rem",
        height: 35,
        padding: 5,
        [theme.breakpoints.down("md")]: {
            marginBottom: "2em"
        }
    },
    message: {
        border: `2px solid ${theme.palette.common.blue}`,
        marginTop: "5em",
        borderRadius: 5
    },
    sendButton: {
        ...theme.typography.estimate,
        borderRadius: 50,
        height: 45,
        width: 245,
        fontSize: "1rem",
        backgroundColor: theme.palette.common.orange,
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        },
        [theme.breakpoints.down("sm")]: {
            height: 40,
            width: 225
        }
    }
}));

export default function Contact(props) {
    const classes = useStyles();
    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");
    const [emailHelper, setEmailHelper] = useState("");

    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState({
        open: false,
        message: "",
        backgroundColor: ""
    });

    const onChange = event => {
        let valid;
        switch (event.target.id) {
            case "email":
                setEmail(event.target.value);
                valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                    event.target.value
                );

                if (!valid) {
                    setEmailHelper("Invalid email");
                } else {
                    setEmailHelper("");
                }
                break;
            default:
                break;
        }
    };

    const onConfirm = () => {
        setLoading(true);
        ReactGA.event({
            category: "Message",
            action: "Sent Message"
        });

        axios
            .get(
                "https://us-central1-shahroozdevelopment.cloudfunctions.net/sendMail",
                {
                    params: {
                        name: name,
                        email: email,
                        phone: phone,
                        message: message
                    }
                }
            )
            .then(res => {
                setOpen(false);
                setName("");
                setEmail("");
                setPhone("");
                setMessage("");
                setAlert({
                    open: true,
                    message: "Message sent successfully.",
                    backgroundColor: "#4BB543"
                });
            })
            .catch(err => {
                setAlert({
                    open: true,
                    message: "Something went wrong, please try again.",
                    backgroundColor: "#FF3232"
                });
            })
            .finally(setLoading(false));
    };

    const buttonContents = (
        <React.Fragment>
            Send Message
            <img
                src={"/assets/send.svg"}
                alt={"paper airplane"}
                style={{marginLeft: "1em"}}
            />
        </React.Fragment>
    );

    return (<Grid container direction={"row"}>
        <Head>
            <title key="title">Contact Us | Shahrooz Development</title>
            <meta
                name="description"
                key="description"
                content="Let us guide you through the custom software design and development process. Send us a message with any of your ideas or questions to get started."
            />
            <meta
                property="og:title"
                content="Bringing Småland Technology to the World | Contact Us"
                key="og:title"
            />
            <meta
                property="og:url"
                key="og:url"
                content="https://shahrooz.herokuapp.com/contact"
            />
            <link
                rel="canonical"
                key="canonical"
                href="https://https://shahrooz.herokuapp.com/contact"
            />
        </Head>
        <Grid
            item
            container
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            style={{
                marginBottom: matchesMD ? "5em" : 0,
                marginTop: matchesSM ? "1em" : matchesMD ? "5em" : 0
            }}
            lg={4}
            xl={3}
        >
            <Grid item>
                <Grid container direction={"column"}>
                    <Grid item>
                        <Typography
                            align={matchesMD ? "center" : undefined}
                            variant={"h1"}
                            style={{lineHeight: 1}}
                        >
                            Contact Us
                        </Typography>
                        <Typography
                            align={matchesMD ? "center" : undefined}
                            variant={"body1"}
                            style={{color: theme.palette.common.blue}}
                        >
                            We're waiting.
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        container
                        style={{marginTop: "2em"}}>
                        <Grid item>
                            <img
                                src={"/assets/phone.svg"}
                                alt={"phone"}
                                style={{marginRight: "0.5em"}}
                            />
                        </Grid>
                        <Grid item>
                            <Typography
                                variant={"body1"}
                                style={{color: theme.palette.common.blue, fontSize: "1rem"}}
                            >
                                +46777777777
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        container
                        style={{marginBottom: "2em"}}>
                        <Grid item>
                            <img
                                src={"/assets/email.svg"}
                                alt={"envelop"}
                                style={{marginRight: "0.5em", verticalAlign: "bottom"}}
                            />
                        </Grid>
                        <Grid item>
                            <Typography
                                variant={"body1"}
                                style={{color: theme.palette.common.blue, fontSize: "1rem"}}
                            >
                                <a
                                    href={"mailto:shahrooz.sabet@gmail.com"}
                                    style={{textDecoration: "none", color: "inherit"}}
                                >
                                    shahrooz.sabet@gmail.com
                                </a>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        container
                        direction={"column"}
                        style={{width: "20em"}}>
                        <Grid
                            item
                            style={{marginBottom: "0.5em"}}>
                            <TextField
                                label={"Name"}
                                id={"name"}
                                fullWidth
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </Grid>
                        <Grid
                            item
                            style={{marginBottom: "0.5em"}}>
                            <TextField
                                label={"Email"}
                                error={emailHelper.length !== 0}
                                helperText={emailHelper}
                                id={"email"}
                                fullWidth
                                value={email}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid
                            item
                            style={{marginBottom: "0.5em"}}>
                            <TextField
                                label={"Phone"}
                                id={"phone"}
                                fullWidth
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid item style={{width: "20em"}}>
                        <TextField
                            InputProps={{disableUnderline: true}}
                            value={message}
                            className={classes.message}
                            multiline
                            placeholder="Tell us more about your project."
                            fullWidth
                            minRows={10}
                            maxRows={10}
                            id={"message"}
                            onChange={(event) => setMessage(event.target.value)}
                        />
                    </Grid>
                    <Grid
                        item
                        container
                        justifyContent={"center"}
                        style={{marginTop: "2em"}}
                    >
                        <Button
                            disabled={
                                name.length === 0 ||
                                message.length === 0 ||
                                phone.length === 0 ||
                                email.length === 0 ||
                                emailHelper.length !== 0
                            }
                            variant={"contained"}
                            className={classes.sendButton}
                            onClick={() => setOpen(true)}
                        >
                            {buttonContents}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Dialog
            style={{zIndex: 1302}}
            open={open}
            fullScreen={matchesSM}
            onClose={() => setOpen(false)}
            PaperProps={{
                style: {
                    paddingTop: matchesXS ? "1em" : "5em",
                    paddingBottom: matchesXS ? "1em" : "5em",
                    paddingLeft: matchesXS ? 0 : matchesSM ? "5em" : matchesMD ? "15em" : "25em",
                    paddingRight: matchesXS ? 0 : matchesSM ? "5em" : matchesMD ? "15em" : "25em"
                }
            }}
        >
            <DialogContent>
                <Grid container direction={"column"}>
                    <Grid item>
                        <Typography
                            align={"center"}
                            variant={"h4"}
                            gutterBottom>
                            Confirm Message
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        style={{marginBottom: "0.5em"}}>
                        <TextField
                            label={"Name"}
                            id={"name"}
                            fullWidth
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </Grid>
                    <Grid
                        item
                        style={{marginBottom: "0.5em"}}>
                        <TextField
                            label={"Email"}
                            error={emailHelper.length !== 0}
                            helperText={emailHelper}
                            id={"email"}
                            fullWidth
                            value={email}
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid
                        item
                        style={{marginBottom: "0.5em"}}>
                        <TextField
                            label={"Phone"}
                            id={"phone"}
                            fullWidth
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </Grid>
                    <Grid item style={{width: matchesSM ? "100%" : "20em"}}>
                        <TextField
                            InputProps={{disableUnderline: true}}
                            value={message}
                            className={classes.message}
                            multiline
                            fullWidth
                            minRows={10}
                            maxRows={10}
                            id={"message"}
                            onChange={(event) => setMessage(event.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction={matchesSM ? "column" : "row"}
                    style={{marginTop: "2em"}}
                    alignItems={"center"}
                >
                    <Grid item>
                        <Button
                            style={{fontWeight: 300}}
                            color={"primary"}
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            disabled={
                                name.length === 0 ||
                                message.length === 0 ||
                                phone.length === 0 ||
                                email.length === 0 ||
                                emailHelper.length !== 0
                            }
                            variant={"contained"}
                            className={classes.sendButton}
                            onClick={onConfirm}
                        >
                            {loading ? <CircularProgress size={30}/> : buttonContents}
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
        <Snackbar
            open={alert.open}
            message={alert.message}
            ContentProps={{style: {backgroundColor: alert.backgroundColor}}}
            anchorOrigin={{vertical: "top", horizontal: "center"}}
            onClose={() => setAlert({...alert, open: false})}
            autoHideDuration={4000}
        />
        <Grid
            item
            container
            direction={matchesMD ? "column" : "row"}
            className={classes.background}
            alignItems={"center"}
            justifyContent={matchesMD ? "center" : undefined}
            lg={8}
            xl={9}
        >
            <Grid
                item
                style={{
                    marginLeft: matchesMD ? 0 : "3em",
                    textAlign: matchesMD ? "center" : "inherit"
                }}
            >
                <Grid container direction={"column"}>
                    <Grid item>
                        <Typography
                            align={matchesMD ? "center" : undefined}
                            variant={"h1"}>
                            Simple Software.
                            <br/>
                            Revolutionary Results.
                        </Typography>
                        <Typography
                            align={matchesMD ? "center" : undefined}
                            variant={"subtitle2"}
                            style={{fontSize: "1.5rem"}}
                        >
                            Take advantage of the 21st Century.
                        </Typography>
                        <Grid
                            container
                            justifyContent={matchesMD ? "center" : undefined}
                            item>
                            <Button
                                component={Link}
                                href={"/revolution"}
                                variant={"outlined"}
                                className={classes.learnButton}
                                onClick={() => props.setValue(2)}
                            >
                                <span style={{marginRight: 5}}>Learn More</span>
                                <ButtonArrow
                                    width={10}
                                    height={10}
                                    fill={theme.palette.common.blue}
                                />
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Button
                    component={Link}
                    href={"/estimate"}
                    variant={"contained"}
                    className={classes.estimateButton}
                    onClick={() => {
                        props.setValue(false);
                        ReactGA.event({
                            category: "Estimate",
                            action: "Contact Page Pressed"
                        });
                    }}
                >
                    Free Estimate
                </Button>
            </Grid>
        </Grid>
    </Grid>);
}
