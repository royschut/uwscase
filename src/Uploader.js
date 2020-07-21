import React, { useState } from "react";

export default function Uploader(props) {
  const [imgs, setImgs] = useState([]);

  const [curImg, setCurImg] = useState();

  const fileInput = React.createRef();

  const onSubmit = (e) => {
    e.preventDefault();
  };
  const onFilePicked = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      const img = {
        img: reader.result,
        name: file.name,
        time: formatTimeFromDate(new Date()),
      };
      setCurImg(img);
    };

    reader.readAsDataURL(file);
  };
  const onAddFile = (e) => {
    if (!curImg) return;
    setImgs([...imgs, curImg]);

    //reset current img
    setCurImg();
    fileInput.current.value = "";

    //Tell App total amount
    props.onSetTotalImages(imgs.length + 1);
  };
  const removeImg = (i) => {
    const arr = imgs;
    arr.splice(i, 1);
    setImgs([...arr]);

    //Tell App total amount
    props.onSetTotalImages(arr.length);
  };

  return (
    <div className="uploader">
      <h1>{props.title}</h1>
      <form className="formUpload" onSubmit={onSubmit}>
        <input type="file" ref={fileInput} onChange={(e) => onFilePicked(e)} />
        {curImg && (
          <div className="imgprev">
            <div className="imgContainer">
              <img src={curImg.img} alt={curImg.name} />
            </div>
            <div className="addBtnContainer">
              <button className="addBtn" type="submit" onClick={onAddFile}>
                <span role="img" aria-label="plus">
                  ➕
                </span>
                Add
              </button>
            </div>
          </div>
        )}
      </form>
      <div className="imgTable">
        {imgs.length > 0 &&
          imgs.map((img, i) => (
            <div className="imgBar" key={i}>
              <div className="imgContainer">
                <img src={img.img} alt={img.name} />
              </div>
              <p className="filename">{img.name}</p>
              <p className="uploadtime">
                [
                <span role="img" aria-label="plus">
                  🕑
                </span>{" "}
                {img.time}]
              </p>
              <button className="removeImg" onClick={(e) => removeImg(i)}>
                x
              </button>
            </div>
          ))}
      </div>
      <div className="addDiv">
        <button
          className={imgs.length ? "" : "inactive"}
          onClick={(e) => {
            if (imgs.length) props.onDone();
          }}
        >
          ✓ Done
        </button>
      </div>
    </div>
  );
}
function formatTimeFromDate(date) {
  function twoDigits(val) {
    val = String(val);
    return val.length === 1 ? "0" + val : val;
  }
  const time =
    twoDigits(date.getHours()) +
    ":" +
    twoDigits(date.getMinutes()) +
    ":" +
    twoDigits(date.getSeconds());
  return time;
}
