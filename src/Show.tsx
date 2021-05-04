import { Button, Card, List, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { db } from "./firebase/firebase";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles({
  list: {
    margin: "auto",
    width: "40%",
  },
  card: {
    margin: "auto",
    width: "100%",
    border: "solid",
    borderColor: "dimgray",
    marginTop: "10px",
    marginBottom: "10px",
    cursor: "pointer",
  },
});

const Show: React.FC = (props: any) => {
  const [titles, setTitles] = useState([{ id: "", sentence: "" }]);

  const classes = useStyles();

  useEffect(() => {
    const unSub = db.collection("quizzes").onSnapshot((snapshot) => {
      setTitles(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          sentence: doc.data().sentence,
        }))
      );
    });
    return () => unSub();
  }, []);

  return (
    <div>
      <List className={classes.list}>
        {titles.map((title, index) => (
          <Card
            className={classes.card}
            variant="outlined"
            onClick={async () => {
              try {
                props.history.push("/solve/" + title.id);
              } catch (error) {
                alert(error.message);
              }
            }}
          >
            <h3>問題番号 {index + 1}</h3>
            {title.sentence}
          </Card>
        ))}
      </List>

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

export default Show;
