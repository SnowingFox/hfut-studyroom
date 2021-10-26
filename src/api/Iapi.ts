export interface LoginProps {
  studentId: string;
  password: string;
}

export interface IStudentInfo {
    buildId: Number;
    id: Number;
    major: String;
    name: String;
    sex: String;
    state: Number;
    studentId: Number;
}

export interface IRecentStatus {
  appointmentId: Number,
  buildId: Number,
  col: Number,
  endTime: String,
  floor: Number,
  num: Number,
  row: Number,
  seatId: Number,
  startTime:String,
  state: 0|1
}
