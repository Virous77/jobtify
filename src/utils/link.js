import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

export const navLinks = [
  {
    id: 1,
    name: "Stats",
    value: "/",
    icon: <IoBarChartSharp />,
  },

  {
    id: 2,
    name: "Add Job",
    value: "add-job",
    icon: <FaWpforms />,
  },

  {
    id: 3,
    name: "All Jobs",
    value: "all-jobs",
    icon: <MdQueryStats />,
  },

  {
    id: 4,
    name: "Profile",
    value: "profile",
    icon: <ImProfile />,
  },
];

export const jobTypes = [
  {
    id: 1,
    name: "full time",
    value: "full-time",
  },

  {
    id: 2,
    name: "part time",
    value: "part-time",
  },

  {
    id: 3,
    name: "remote",
    value: "remote",
  },
  {
    id: 4,
    name: "internship",
    value: "internship",
  },
];

export const jobStatus = [
  {
    id: 1,
    name: "interview",
    value: "interview",
  },
  {
    id: 2,
    name: "declined",
    value: "declined",
  },
  {
    id: 3,
    name: "pending",
    value: "pending",
  },
];

export const sorts = [
  {
    id: 1,
    name: "oldest",
    value: "oldest",
  },
];
