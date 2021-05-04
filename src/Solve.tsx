import { Button, FormControl, MenuItem, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { db } from "./firebase/firebase";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: 20,
    marginBottom: 10,
  },
  list: {
    margin: "auto",
    width: "40%",
  },
  sentence: {
    // width: "1200",
    // height: "1000",
  },
  button: {
    margin: theme.spacing(1),
  },
  answer: {
    margin: theme.spacing(1),
    width: "100px",
    height: "80px",
  },
  choice: {
    margin: theme.spacing(1),
    width: "15%",
  },
  resize: {
    fontSize: 32,
    lineHeight: "normal",
  },
}));

const Solve = () => {
  const path = window.location.pathname;
  const id = path.split("/solve/")[1];

  const [quiz, setQuiz] = useState({
    id: "",
    sentence: "",
    choiceA: "",
    choiceB: "",
    choiceC: "",
    choiceD: "",
    answer: "",
  });
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    db.collection("quizzes")
      .doc(id)
      .get()
      .then((doc) => {
        const data: any = doc.data();
        setQuiz(data);
      });
  }, [quiz]);

  const answers = [
    {
      value: "A",
      label: "A",
    },
    {
      value: "B",
      label: "B",
    },
    {
      value: "C",
      label: "C",
    },
    {
      value: "D",
      label: "D",
    },
  ];

  const classes = useStyles();

  const submitAnswer = (answer: any) => {
    if (answer === quiz.answer) {
      alert("正解です！");
    } else {
      alert("不正解です…");
    }
  };

  return (
    <div>
      <h1>問題解答ページ</h1>
      <br />
      <TextField
        className={classes.sentence}
        fullWidth
        InputProps={{
          classes: {
            input: classes.resize,
          },
        }}
        // label="問題文を入力してください。"
        size="medium"
        margin="dense"
        value={quiz.sentence}
        multiline={true}
      >
        <h1>問題文を入力してください</h1>
      </TextField>
      <br />
      <Button
        className={classes.choice}
        color="primary"
        variant="outlined"
        onClick={() => setAnswer("A")}
      >
        <h1>{quiz.choiceA}</h1>
      </Button>
      <Button
        className={classes.choice}
        color="primary"
        variant="outlined"
        onClick={() => setAnswer("B")}
      >
        <h1>{quiz.choiceB}</h1>
      </Button>
      <Button
        className={classes.choice}
        color="primary"
        variant="outlined"
        onClick={() => setAnswer("C")}
      >
        <h1>{quiz.choiceC}</h1>
      </Button>
      <Button
        className={classes.choice}
        color="primary"
        variant="outlined"
        onClick={() => setAnswer("D")}
      >
        <h1>{quiz.choiceD}</h1>
      </Button>
      <br />
      <TextField
        id="standard-select-answer"
        className={classes.answer}
        select
        label="答え"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      >
        {answers.map((option: any) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <br />
      <Button
        variant="contained"
        onClick={submitAnswer}
        color="primary"
        size="large"
      >
        解答する
        <AddToPhotosIcon />
      </Button>
    </div>
  );
};

export default Solve;
