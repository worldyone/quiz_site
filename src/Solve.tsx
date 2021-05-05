import {
  Button,
  ButtonBase,
  Card,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { db } from "./firebase/firebase";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: 20,
    marginBottom: 10,
  },
  list: {
    margin: "auto",
    width: "40%",
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
    display: "initial",
  },
  resize: {
    fontSize: 32,
    lineHeight: "normal",
  },
  label: {
    display: "initial",
  },
  block: {
    display: "block",
    textAlign: "right",
  },
}));

const Solve = (props: any) => {
  const path = window.location.pathname;
  const quiz_id = path.split("/solve/")[1];

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
    if (quiz_id === undefined || quiz_id === "") {
      // ランダムで問題を取得する
      const quizzesList: {
        id: string;
        sentence: string;
        choiceA: string;
        choiceB: string;
        choiceC: string;
        choiceD: string;
        answer: string;
      }[] = [];
      db.collection("quizzes")
        .get()
        .then((snapshots) => {
          snapshots.forEach((snapshot) => {
            const quizzes: any = snapshot.data();
            quizzesList.push({
              id: snapshot.id,
              sentence: quizzes.sentence,
              choiceA: quizzes.choiceA,
              choiceB: quizzes.choiceB,
              choiceC: quizzes.choiceC,
              choiceD: quizzes.choiceD,
              answer: quizzes.answer,
            });
          });
          const randomIndex = Math.floor(Math.random() * quizzesList.length);
          setQuiz(quizzesList[randomIndex]);
        });
    } else {
      // 指定のIDの問題を取得する
      db.collection("quizzes")
        .doc(quiz_id)
        .get()
        .then((doc) => {
          const data: any = doc.data();
          setQuiz(data);
        });
    }
  }, []);

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

  const submitAnswer = (answer: string) => {
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
        onDoubleClick={() => submitAnswer(answer)}
      >
        <span className={classes.block}>選択肢A</span>
        <h1>{quiz.choiceA}</h1>
      </Button>
      <Button
        className={classes.choice}
        color="primary"
        variant="outlined"
        onClick={() => setAnswer("B")}
        onDoubleClick={() => submitAnswer(answer)}
      >
        <span className={classes.block}>選択肢B</span>
        <h1>{quiz.choiceB}</h1>
      </Button>
      <Button
        className={classes.choice}
        color="primary"
        variant="outlined"
        onClick={() => setAnswer("C")}
        onDoubleClick={() => submitAnswer(answer)}
      >
        <span className={classes.block}>選択肢C</span>
        <h1>{quiz.choiceC}</h1>
      </Button>
      <Button
        className={classes.choice}
        color="primary"
        variant="outlined"
        onClick={() => setAnswer("D")}
        onDoubleClick={() => submitAnswer(answer)}
      >
        <span className={classes.block}>選択肢D</span>
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
        onClick={() => submitAnswer(answer)}
        color="primary"
        size="large"
      >
        解答する
        <AddToPhotosIcon />
      </Button>

      <br />
      <br />
      <Button
        variant="contained"
        onClick={() => document.location.reload()}
        color="secondary"
        size="large"
      >
        ランダムな問題を解く
        <AddToPhotosIcon />
      </Button>

      <br />
      <br />
      <Button
        variant="contained"
        onClick={() => props.history.push("/")}
        color="default"
        size="large"
      >
        ホームに戻る
        <HomeIcon />
      </Button>
    </div>
  );
};

export default Solve;
