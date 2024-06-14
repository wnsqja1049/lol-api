"use client";

export const GameDuration = ({gameDuration} : {gameDuration: number}) => {
	var minutes = Math.floor(gameDuration / 60);
	var seconds = gameDuration % 60;

	var minuteString = "";
	var secondString = "";

	if(minutes < 10) {
		minuteString = "0" + minutes.toString();
	} else {
		minuteString = minutes.toString();
	}

	if(seconds < 10) {
		secondString = "0" + seconds.toString();
	} else {
		secondString = seconds.toString();
	}

	return (
		<div>{minuteString}분 {secondString}초</div>
	);
};
export const CompactGameDuration = ({gameDuration} : {gameDuration: number}) => {
	var minutes = Math.floor(gameDuration / 60);
	var seconds = gameDuration % 60;

	var minuteString = "";
	var secondString = "";

	if(minutes < 10) {
		minuteString = "0" + minutes.toString();
	} else {
		minuteString = minutes.toString();
	}
	
	if(seconds < 10) {
		secondString = "0" + seconds.toString();
	} else {
		secondString = seconds.toString();
	}

	return (
		<div>{minuteString}:{secondString}</div>
	);
};
export const TimeStampToTimeBefore = ({timeStamp} : {timeStamp: number}) => {
	var end = Math.floor(new Date(timeStamp).getTime() / 1000);
	let now = Math.floor(Date.now() / 1000);

	let value = now - end;
	
	let beforeDays = Math.floor(value / (24 * 60 * 60));
	let beforeHours = Math.floor(value / (60 * 60));
	let beforeMinutes = Math.floor(value / 60);

	if(beforeDays >= 1) {
		return (
			<div>{beforeDays}일 전</div>
		);
	} else if(beforeHours >= 1) {
		return (
			<div>{beforeHours}시간 전</div>
		);
	} else if(beforeMinutes) {
		return (
			<div>{beforeMinutes}분 전</div>
		);
	} else {
		return (
			<></>
		)
	}
};
