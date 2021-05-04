import { Button, FormControl, MenuItem, TextField } from "@material-ui/core";
import React, { useState } from "react";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import { db } from "./firebase/firebase";
import { makeStyles } from "@material-ui/core/styles";
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
  sentence: {
    width: "550px",
    height: "120px",
  },
  button: {
    margin: theme.spacing(1),
  },
  answer: {
    margin: theme.spacing(1),
    width: "100px",
    height: "80px",
  },
}));

const Create = (props: any) => {
  const [sentence, setSentence] = useState("");
  const [choiceA, setChoiceA] = useState("");
  const [choiceB, setChoiceB] = useState("");
  const [choiceC, setChoiceC] = useState("");
  const [choiceD, setChoiceD] = useState("");
  const [answer, setAnswer] = useState("");

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

  const newQuize = (e: any) => {
    if (
      sentence !== "" &&
      choiceA !== "" &&
      choiceB !== "" &&
      choiceC !== "" &&
      choiceD !== "" &&
      answer !== ""
    ) {
      db.collection("quizzes").add({
        sentence: sentence,
        choiceA: choiceA,
        choiceB: choiceB,
        choiceC: choiceC,
        choiceD: choiceD,
        answer: answer,
      });
      alert("問題を投稿しました！");

      setSentence("");
      setChoiceA("");
      setChoiceB("");
      setChoiceC("");
      setChoiceD("");
      setAnswer("");
    } else {
      alert("空白の項目を埋めてください。");
    }
  };

  return (
    <div>
      <h1>問題作成ページ</h1>
      <br />
      <FormControl>
        <TextField
          className={classes.sentence}
          label="問題文を入力してください。"
          size="medium"
          value={sentence}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSentence(e.target.value)
          }
          multiline={true}
        />
      </FormControl>
      <br />
      <FormControl>
        <TextField
          className={classes.field}
          label="選択肢A"
          variant="outlined"
          value={choiceA}
          onChange={(e) => setChoiceA(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <TextField
          className={classes.field}
          label="選択肢B"
          variant="outlined"
          value={choiceB}
          onChange={(e) => setChoiceB(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <TextField
          className={classes.field}
          label="選択肢C"
          variant="outlined"
          value={choiceC}
          onChange={(e) => setChoiceC(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <TextField
          className={classes.field}
          label="選択肢D"
          variant="outlined"
          value={choiceD}
          onChange={(e) => setChoiceD(e.target.value)}
        />
      </FormControl>
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
        onClick={newQuize}
        color="primary"
        size="large"
      >
        投稿する
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

export default Create;
