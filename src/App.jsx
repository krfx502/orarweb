import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, RotateCcw, Award, Moon, Sun, RefreshCw, Home, Lock, ChevronRight } from 'lucide-react';

const quiz1Data = [
  // --- Fundamentals & OS ---
  {
    id: 1,
    text: "An operating system serves two fundamental roles: as a ______ that hides hardware complexity, and as a ______ that allocates CPU, memory, and I/O fairly.",
    type: "single",
    options: [
      "resource manager / virtual machine",
      "virtual machine / resource manager",
      "kernel / shell",
      "supervisor / user application"
    ],
    correctAnswer: "virtual machine / resource manager",
    explanation: "An OS acts as a virtual machine by providing a simplified interface to hardware, and as a resource manager by fairly distributing system resources (CPU, RAM, etc.)."
  },
  {
    id: 2,
    text: "In the PATH variable, the __ character is used to separate the directories.",
    type: "single",
    options: [":", "/", "~", ";"],
    correctAnswer: ":",
    explanation: "In Linux/Unix, directories in the PATH variable are separated by a colon (:). You previously selected '/', which is the directory separator for file paths, not the PATH list separator."
  },
  {
    id: 3,
    text: "In Bash, an exit code of 0 stored in $? indicates that the previous command completed successfully.",
    type: "single",
    options: ["Adevărat (True)", "Fals (False)"],
    correctAnswer: "Adevărat (True)",
    explanation: "An exit code of 0 always means success in Bash. Any non-zero exit code indicates an error."
  },
  {
    id: 4,
    text: "What is the ASCII decimal code of the character that marks files as hidden in Linux (the dot/period)?",
    type: "text",
    correctAnswer: "46",
    explanation: "The ASCII decimal value for a dot/period (.) is 46. You previously entered a literal dot."
  },
  {
    id: 5,
    text: "Which of the following commands will produce the same result as `start=\\`date\\``?",
    type: "single",
    options: ["start=%date%", "start=(date)", "start=$(date)", "start=date"],
    correctAnswer: "start=$(date)",
    explanation: "$(command) is the modern, preferred Bash syntax for command substitution, replacing the older backtick `command` syntax."
  },
  {
    id: 6,
    text: "Linux is distributed under which license?",
    type: "single",
    options: ["MIT", "GPLv3", "BSD", "Linux Foundation", "GPLv2"],
    correctAnswer: "GPLv2",
    explanation: "The Linux kernel is specifically licensed under the GNU General Public License version 2 (GPLv2)."
  },
  {
    id: 7,
    text: "An interpreted programming language: (choose two)",
    type: "multiple",
    options: [
      "Tends to offer more features than compiled languages",
      "Takes fewer resources to run than a compiled language",
      "Must be linked against system libraries before execution",
      "Is converted into machine specific instructions as the program runs",
      "Must be compiled to machine code before it can run"
    ],
    correctAnswer: [
      "Tends to offer more features than compiled languages",
      "Is converted into machine specific instructions as the program runs"
    ],
    explanation: "Interpreted languages are translated on the fly (as they run) and generally offer higher-level features (like dynamic typing) at the cost of using MORE resources, not fewer."
  },
  {
    id: 8,
    text: "What is the fundamental difference between brace expansion {a,b,c} and glob patterns [abc]?",
    type: "single",
    options: [
      "Brace expansion only works with numeric sequences, not strings",
      "Braces generate strings unconditionally; globs match existing files",
      "There is no functional difference; both match existing files",
      "Globs are faster than brace expansion"
    ],
    correctAnswer: "Braces generate strings unconditionally; globs match existing files",
    explanation: "Brace expansion creates the strings regardless of what is on your hard drive. Globs (*, ?, []) only return results if files actually exist matching that pattern."
  },
  {
    id: 9,
    text: "Which TWO are valid disk partition table types? (choose two)",
    type: "multiple",
    options: [
      "BIOS — firmware, not partition table",
      "GPT (GUID Partition Table) — modern, >2TB support",
      "MBR (Master Boot Record) — legacy, up to 2TB",
      "UEFI — firmware interface, uses GPT"
    ],
    correctAnswer: [
      "GPT (GUID Partition Table) — modern, >2TB support",
      "MBR (Master Boot Record) — legacy, up to 2TB"
    ],
    explanation: "MBR and GPT are the two actual structures written to a disk to define partitions. BIOS and UEFI are motherboard firmwares."
  },
  {
    id: 10,
    text: "The `fdisk` command is a tool used for working with the MBR partitioned disks. True or False?",
    type: "single",
    options: ["Adevărat (True)", "Fals (False)"],
    correctAnswer: "Adevărat (True)",
    explanation: "fdisk is the classic tool for MBR. gdisk is typically used for GPT disks."
  },
  {
    id: 11,
    text: "Which of the following commands will check hard disk MBR partitions? (choose three)",
    type: "multiple",
    options: ["gdisk", "sfdisk", "fdisk", "cfdisk", "gfdisk"],
    correctAnswer: ["sfdisk", "fdisk", "cfdisk"],
    explanation: "fdisk, cfdisk, and sfdisk all manipulate MBR partition tables. gdisk is for GPT. You missed sfdisk and cfdisk previously!"
  },
  {
    id: 12,
    text: "Applications run in ______ mode with restricted hardware access. To request OS services, they issue a ______, which triggers a transition to ______ mode.",
    type: "single",
    options: [
      "user / system call / kernel",
      "supervisor / system call / kernel",
      "kernel / interrupt / user",
      "user / process / supervisor"
    ],
    correctAnswer: "user / system call / kernel",
    explanation: "Standard apps run in 'user' mode. They use a 'system call' to ask the 'kernel' to do privileged hardware tasks."
  },
  
  // --- Navigation & Commands ---
  {
    id: 13,
    text: "The `cd` command by itself will take you to what directory?",
    type: "single",
    options: [
      "The parent directory above your current location",
      "None; it is not a valid command",
      "The system root directory",
      "Your home directory"
    ],
    correctAnswer: "Your home directory",
    explanation: "Typing just `cd` and pressing enter defaults to taking you straight to your home directory (~)."
  },
  {
    id: 14,
    text: "The double dot (..) can be used with the cd command to represent:",
    type: "single",
    options: [
      "The directory above the current working directory",
      "A user's home directory",
      "Any two single characters",
      "Nothing special; the shell treats it as a literal string."
    ],
    correctAnswer: "The directory above the current working directory",
    explanation: "The double dot (..) refers to the parent directory."
  },
  {
    id: 15,
    text: "In Bash, which symbol represents the home directory, which refers to the parent directory, and which denotes the current directory?",
    type: "single",
    options: [
      "~ (home), - (parent), . (current)",
      "~ (home), .. (parent), . (current)",
      "/ (home), .. (parent), * (current)",
      "~ (home), . (parent), .. (current)"
    ],
    correctAnswer: "~ (home), .. (parent), . (current)",
    explanation: "Tilde (~) is home. Double dot (..) is parent. Single dot (.) is current directory. (A single dash '-' takes you to your PREVIOUS directory, not necessarily parent)."
  },
  {
    id: 16,
    text: "Which option for the `ls` command, when used in conjunction with the `-l` option, will display human-readable file sizes?",
    type: "single",
    options: ["-h", "-M", "-H", "-S"],
    correctAnswer: "-h",
    explanation: "-h stands for human-readable (shows KB, MB, GB instead of just bytes)."
  },
  {
    id: 17,
    text: "What does the -r option do with the `ls` command?",
    type: "single",
    options: [
      "Groups files by their extension type",
      "Displays detailed information about files",
      "Shows hidden files including dotfiles",
      "Lists files in reverse alphabetical order"
    ],
    correctAnswer: "Lists files in reverse alphabetical order",
    explanation: "-r reverses the sort order. (-R uppercase is recursive, -a is hidden, -l is detailed)."
  },
  {
    id: 18,
    text: "The `ls` command without options or arguments:",
    type: "single",
    options: [
      "...lists the contents of the current directory.",
      "...prompts for a directory to list.",
      "...generates an error as this command requires arguments.",
      "...lists the contents of a user's home directory."
    ],
    correctAnswer: "...lists the contents of the current directory.",
    explanation: "By default, ls lists visible files and directories in your current location."
  },
  {
    id: 19,
    text: "Which of the following commands will prevent any aliased options to the `ls` command?",
    type: "single",
    options: ["\"ls\"", "\\ls", "/ls", "%ls"],
    correctAnswer: "\\ls",
    explanation: "Prepending a backslash (\\) temporarily bypasses any alias set for that command."
  },
  {
    id: 20,
    text: "The `touch` command can be used to: (choose two)",
    type: "multiple",
    options: [
      "Update the timestamp of existing files",
      "Rename a file",
      "Create new files",
      "Change ownership of a file"
    ],
    correctAnswer: [
      "Update the timestamp of existing files",
      "Create new files"
    ],
    explanation: "If the file doesn't exist, touch creates it. If it does exist, touch updates its modified/accessed timestamps."
  },

  // --- Help, Globbing & Advanced ---
  {
    id: 21,
    text: "What is the standard option to view a command's built-in help?",
    type: "single",
    options: ["-h", "--info", "--help", "--manual"],
    correctAnswer: "--help",
    explanation: "--help is the GNU standard long option for built-in command documentation."
  },
  {
    id: 22,
    text: "To get help on using the `info` command, execute: (choose two)",
    type: "multiple",
    options: ["help info", "info info", "man info", "info -q"],
    correctAnswer: ["info info", "man info"],
    explanation: "`info` is a standalone program, not a bash builtin, so `help info` doesn't work. You use `man info` or `info info`."
  },
  {
    id: 23,
    text: "In which section number of the man pages are regular user commands documented?",
    type: "text",
    correctAnswer: "1",
    explanation: "Section 1 is for user commands. Section 8 is usually for sysadmin commands. Section 5 is for configuration files."
  },
  {
    id: 24,
    text: "To search the man page sections for the keyword 'example', which of the following command lines could you execute? (choose two)",
    type: "multiple",
    options: ["man -k example", "whatis example", "man -f example", "apropos example"],
    correctAnswer: ["man -k example", "apropos example"],
    explanation: "`apropos` and `man -k` search the name AND DESCRIPTION of man pages for a keyword. `whatis` and `man -f` only search the exact command names."
  },
  {
    id: 25,
    text: "The ______ command displays complete manual pages, while ______ provides a quick summary of command options.",
    type: "single",
    options: [
      "man / apropos",
      "man / whatis",
      "info / man",
      "whatis / apropos"
    ],
    correctAnswer: "man / whatis",
    explanation: "`man` shows the full page. `whatis` shows a one-line summary (the NAME section of the man page)."
  },
  {
    id: 26,
    text: "Which glob character matches exactly one character?",
    type: "single",
    options: ["*", "?", ".", "["],
    correctAnswer: "?",
    explanation: "The question mark (?) matches exactly one character in globbing. Asterisk (*) matches zero or more."
  },
  {
    id: 27,
    text: "Which of the following are glob characters? (choose three)",
    type: "multiple",
    options: [
      "The asterisk *",
      "The dash character -",
      "The question mark ?",
      "The square brackets [ and ]"
    ],
    correctAnswer: [
      "The asterisk *",
      "The question mark ?",
      "The square brackets [ and ]"
    ],
    explanation: "*, ?, and [] are the fundamental shell globbing characters."
  },
  {
    id: 28,
    text: "What will the following statement do? `for name in \\`cat /root/users\\``",
    type: "single",
    options: [
      "Run for two values: cat and /root/users",
      "Report a syntax error due to missing backtick closure",
      "Assign to the name variable each value in the specified file",
      "Enter an infinite loop reading the file continuously"
    ],
    correctAnswer: "Assign to the name variable each value in the specified file",
    explanation: "The backticks execute the command `cat /root/users` first. The `for` loop then iterates over every word/line returned by that command."
  },
  
  // --- Variables, Permissions & Distros ---
  {
    id: 29,
    text: "What is the key difference between `source script.sh` and `./script.sh`?",
    type: "single",
    options: [
      "source is faster because it skips the fork() system call",
      "source requires execute permission",
      "They are identical — both execute in the current shell environment",
      "source runs in current shell; ./script.sh runs in subshell"
    ],
    correctAnswer: "source runs in current shell; ./script.sh runs in subshell",
    explanation: "Using `./` creates a new child process (subshell) so variables don't persist. `source` runs it in your CURRENT shell, so variable changes stay active."
  },
  {
    id: 30,
    text: "You define `SECRET=password` without export. What happens in a subshell?",
    type: "single",
    options: [
      "The subshell inherits all variables",
      "An error occurs",
      "The variable SECRET is undefined",
      "The variable has value 'password'"
    ],
    correctAnswer: "The variable SECRET is undefined",
    explanation: "Local variables (not exported) are NOT passed down to child processes/subshells."
  },
  {
    id: 31,
    text: "To make a variable accessible in child processes, use the ______ command. To remove a variable entirely, use ______.",
    type: "single",
    options: [
      "export / delete",
      "env / remove",
      "export / unset",
      "set / unset"
    ],
    correctAnswer: "export / unset",
    explanation: "`export` makes it global to children. `unset` completely removes a variable."
  },
  {
    id: 32,
    text: "Which chmod ensures ONLY the owner can execute a script?",
    type: "single",
    options: [
      "`chmod +x script`",
      "`chmod u+x,go-x script`",
      "`chmod a+x script`",
      "`chmod 755 script`"
    ],
    correctAnswer: "`chmod u+x,go-x script`",
    explanation: "`u+x` adds execution for the User (owner). `go-x` explicitly removes execution for Group and Others."
  },
  {
    id: 33,
    text: "Apple's OS X is: (choose three)",
    type: "multiple",
    options: [
      "Partially based on code from the FreeBSD project",
      "Derived from Linux",
      "Able to natively run Windows binaries",
      "A fully certified UNIX distribution",
      "Tightly integrated with Apple hardware",
      "Primarily used to manage network services"
    ],
    correctAnswer: [
      "Partially based on code from the FreeBSD project",
      "A fully certified UNIX distribution",
      "Tightly integrated with Apple hardware"
    ],
    explanation: "macOS (OS X) is NOT Linux. It is a certified UNIX, heavily based on FreeBSD, and tied to Apple hardware."
  },
  {
    id: 34,
    text: "Linux source code is available to:",
    type: "single",
    options: [
      "Anyone who has the knowledge needed to access it",
      "Only university researchers with a government grant",
      "Employees of the FBI, CIA and NSA with top secret clearance",
      "Only employees of the Linux Foundation"
    ],
    correctAnswer: "Anyone who has the knowledge needed to access it",
    explanation: "Linux is open source. Anyone can view and modify the source code."
  },
  {
    id: 35,
    text: "Open source licenses differ, but generally agree that: (choose two)",
    type: "multiple",
    options: [
      "You should have access to the source code of software",
      "You are not allowed to sell the software",
      "You must redistribute your changes",
      "You should be able to modify the software as you wish"
    ],
    correctAnswer: [
      "You should have access to the source code of software",
      "You should be able to modify the software as you wish"
    ],
    explanation: "Open source guarantees access to code and the right to modify it. You ARE actually allowed to sell open source software, and you don't always have to redistribute changes (depends on the specific license)."
  },
  {
    id: 36,
    text: "What does the `alias` command do?",
    type: "single",
    options: [
      "Runs a specific program",
      "Shows information about a command",
      "Creates a shortcut for a longer command",
      "Lists all available commands"
    ],
    correctAnswer: "Creates a shortcut for a longer command",
    explanation: "Aliases are custom shortcuts, e.g., `alias update='sudo apt update && sudo apt upgrade'`."
  },
  {
    id: 37,
    text: "A user defines `alias cls='clear'` directly in the terminal. After closing and reopening the terminal, the alias no longer works. What is the most likely cause?",
    type: "single",
    options: [
      "The alias was not saved in ~/.bashrc or another initialisation file",
      "The alias definition used incorrect syntax or missing quotes",
      "Aliases require root privileges to be saved permanently across sessions",
      "The clear command does not exist on this system"
    ],
    correctAnswer: "The alias was not saved in ~/.bashrc or another initialisation file",
    explanation: "Commands typed directly into the terminal are volatile. To make them permanent, they must be saved in a startup script like ~/.bashrc."
  },
  {
    id: 38,
    text: "Which of the following commands will execute the last command that started with `ec`:",
    type: "single",
    options: ["!-ec", "!!", "!?ec", "!ec"],
    correctAnswer: "!ec",
    explanation: "`!string` executes the most recent command starting with that string. `!!` runs the very last command. `!?string` runs a command CONTAINING the string."
  },
  {
    id: 39,
    text: "The `jamie` user already exists in the system. The command `grep jamie /etc/passwd` displays one user record. Running the `echo $?` command immediately after would result in what output?",
    type: "single",
    options: ["1", "5", "2", "0"],
    correctAnswer: "0",
    explanation: "Because `grep` successfully found the record, it exits with a success status, which in Bash is 0."
  },
  // --- NEW QUESTIONS ADDED FROM LATEST IMAGES ---
  {
    id: 40,
    text: "An ______ (Interrupt Request) is a hardware signal line used by devices to request CPU attention. The code that handles the interrupt is called an ______ (Interrupt Service Routine). The IVT stores the ______ of all ISRs.",
    type: "single",
    options: [
      "interrupt request / interrupt service routine / memory addresses",
      "interrupt signal / interrupt handler / process IDs",
      "interrupt request / system call / memory addresses",
      "I/O request / interrupt service routine / IRQ numbers"
    ],
    correctAnswer: "interrupt request / interrupt service routine / memory addresses",
    explanation: "Hardware sends an Interrupt Request (IRQ). The CPU runs the Interrupt Service Routine (ISR) to handle it. The Interrupt Vector Table (IVT) holds the memory addresses of these routines."
  },
  {
    id: 41,
    text: "______ quotes prevent all interpretation by the shell, while ______ quotes allow variable expansion but prevent word splitting.",
    type: "single",
    options: [
      "Double / Single",
      "Single / Double",
      "Backtick / Single",
      "Single / Backtick"
    ],
    correctAnswer: "Single / Double",
    explanation: "Single quotes ('') are literal and prevent ALL interpretation. Double quotes (\"\") allow variables like $USER to be expanded while keeping the string together as one argument."
  },
  {
    id: 42,
    text: "Which correctly distinguishes monolithic and microkernel architectures?",
    type: "single",
    options: [
      "Microkernels achieve higher performance due to minimal kernel-space footprint",
      "Linux implements a pure microkernel design with all drivers in user space",
      "Monolithic kernels cannot load or unload any modules during runtime",
      "Monolithic runs services in kernel space; microkernel moves most to user space"
    ],
    correctAnswer: "Monolithic runs services in kernel space; microkernel moves most to user space",
    explanation: "Monolithic kernels (like Linux) run OS services in a single large kernel space. Microkernels run only the bare minimum in kernel space and move services/drivers to user space."
  },
  {
    id: 43,
    text: "Linux uses a ______ kernel architecture, where all services run in the same ______. In contrast, Minix uses a ______ design.",
    type: "single",
    options: [
      "monolithic / virtual machine / microkernel",
      "monolithic / address space / microkernel",
      "microkernel / address space / monolithic",
      "supervisor / kernel space / monolithic"
    ],
    correctAnswer: "monolithic / address space / microkernel",
    explanation: "Linux is monolithic, sharing a single kernel address space for its services. Minix is the classic example of a microkernel architecture. (You previously selected 'virtual machine' which is incorrect here)."
  },
  {
    id: 44,
    text: "Complete the help-seeking commands:\n1. Read the manual page for ls: ___ ls\n2. Search manuals by keyword: ___ network\n3. Brief description of a command: ___ grep\n4. Built-in help for cd: ___ cd",
    type: "single",
    options: [
      "man / apropos / whatis / help",
      "read / apropos / whatis / help",
      "man / grep / info / man",
      "info / find / whatis / info"
    ],
    correctAnswer: "man / apropos / whatis / help",
    explanation: "man = manual pages. apropos = search man page descriptions by keyword. whatis = brief one-line description. help = documentation for shell built-ins like cd."
  },
  {
    id: 45,
    text: "Environment variables cannot be created by which command?",
    type: "single",
    options: [
      "declare",
      "export",
      "set",
      "typeset"
    ],
    correctAnswer: "set",
    explanation: "The `set` command (without -a) creates local shell variables, not environment variables. `export`, `declare -x`, and `typeset -x` can all create environment variables."
  },
  {
    id: 46,
    text: "Environment variables can be viewed by running: (choose two)",
    type: "multiple",
    options: [
      "env",
      "printenv",
      "setenv",
      "showenv"
    ],
    correctAnswer: [
      "env",
      "printenv"
    ],
    explanation: "Both `env` and `printenv` will print out all currently exported environment variables in Linux."
  }
];

const quiz2Data = [
  // Empty for now, will add questions later
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const question = activeQuestions[currentQuestionIndex];
  const isChecked = question ? checkedQuestions.includes(question.id) : false;

  const handleSingleSelect = (option) => {
    if (isChecked) return;
    setUserAnswers({ ...userAnswers, [question.id]: option });
  };

  const handleMultiSelect = (option) => {
    if (isChecked) return;
    const currentSelected = userAnswers[question.id] || [];
    let newSelected;
    if (currentSelected.includes(option)) {
      newSelected = currentSelected.filter(item => item !== option);
    } else {
      newSelected = [...currentSelected, option];
    }
    setUserAnswers({ ...userAnswers, [question.id]: newSelected });
  };

  const handleTextChange = (e) => {
    if (isChecked) return;
    setUserAnswers({ ...userAnswers, [question.id]: e.target.value });
  };

  // FIX: Changed quizData to activeQuestions to prevent the ReferenceError crash!
  const checkAnswer = (qId) => {
    const q = activeQuestions.find(x => x.id === qId);
    if (!q) return false;
    
    const uAns = userAnswers[qId];
    
    if (q.type === 'single') {
      return uAns === q.correctAnswer;
    } else if (q.type === 'multiple') {
      if (!uAns || uAns.length !== q.correctAnswer.length) return false;
      return q.correctAnswer.every(val => uAns.includes(val));
    } else if (q.type === 'text') {
      return uAns && uAns.trim().toLowerCase() === q.correctAnswer.toLowerCase();
    }
    return false;
  };

  const handleCheckQuestion = () => {
    if (question && !checkedQuestions.includes(question.id)) {
      setCheckedQuestions([...checkedQuestions, question.id]);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const restartQuiz = () => {
    const data = selectedQuizId === 'quiz1' ? quiz1Data : quiz2Data;
    setActiveQuestions(data);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setCheckedQuestions([]);
    setShowResults(false);
  };

  const retakeMissed = () => {
    const missed = activeQuestions.filter(q => !checkAnswer(q.id));
    if (missed.length > 0) {
      setActiveQuestions(missed);
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setCheckedQuestions([]);
      setShowResults(false);
    }
  };

  const calculateScore = () => {
    let score = 0;
    activeQuestions.forEach(q => {
      if (checkAnswer(q.id)) score++;
    });
    return score;
  };

  const isCurrentQuestionAnswered = () => {
    if (!question) return false;
    const currentAns = userAnswers[question.id];
    if (currentAns === undefined) return false;
    if (Array.isArray(currentAns)) return currentAns.length > 0;
    return currentAns.toString().trim() !== '';
  };

  // FIX: Added explicit text colors to prevent white-on-white text issues
  const getOptionStyles = (option) => {
    const isSelected = question.type === 'multiple' 
      ? (userAnswers[question.id] || []).includes(option)
      : userAnswers[question.id] === option;
    
    if (!isChecked) {
      return isSelected 
        ? 'border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-900/40 dark:border-blue-400 dark:text-blue-100 shadow-sm' 
        : 'border-gray-200 bg-white text-gray-800 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700/50';
    }

    const isCorrectOption = question.type === 'multiple'
      ? question.correctAnswer.includes(option)
      : question.correctAnswer === option;

    if (isCorrectOption) {
      return 'border-green-500 bg-green-50 text-green-800 dark:bg-green-900/40 dark:text-green-300 font-medium';
    }
    if (isSelected && !isCorrectOption) {
      return 'border-red-500 bg-red-50 text-red-800 dark:bg-red-900/40 dark:text-red-300 font-medium line-through decoration-red-400 opacity-80';
    }
    
    return 'border-gray-200 bg-gray-50 text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500 opacity-50';
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'linux') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleSelectQuiz = (quizId) => {
    const data = quizId === 'quiz1' ? quiz1Data : quiz2Data;
    if (data.length === 0) {
      alert("QUIZ 2 is currently empty. Questions will be added later!");
      return;
    }
    setSelectedQuizId(quizId);
    setActiveQuestions(data);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setCheckedQuestions([]);
    setShowResults(false);
  };

  const exitQuiz = () => {
    setSelectedQuizId(null);
    setShowResults(false);
  };

  const isCurrentCorrect = isChecked && checkAnswer(question?.id);

  // Consolidated render function to ensure global theme applies cleanly
  const renderContent = () => {
    if (!isAuthenticated) {
      return (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden p-8 text-center transition-colors">
            <div className="flex justify-end mb-4">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Private Access</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Please enter the password to access the quizzes.</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter password..."
                  className={`w-full p-4 border rounded-xl text-lg outline-none transition-all text-gray-900 dark:text-white ${
                    loginError 
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700'
                  }`}
                />
                {loginError && <p className="text-red-500 text-sm mt-2 text-left">Incorrect password. Please try again.</p>}
              </div>
              <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors text-lg">
                Unlock
              </button>
            </form>
          </div>
        </div>
      );
    }

    if (!selectedQuizId) {
      return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto min-h-screen">
          <div className="flex justify-between items-center mb-12 mt-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Your Quizzes</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">Select a quiz module to begin your practice.</p>
            </div>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-sm hover:shadow-md text-gray-600 dark:text-gray-300 transition-all">
              {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* QUIZ 1 CARD */}
            <button 
              onClick={() => handleSelectQuiz('quiz1')}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-6 text-left shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-transparent hover:border-blue-500 dark:hover:border-blue-400"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
                  <span className="font-bold text-blue-600 dark:text-blue-400 text-xl">1</span>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">QUIZ 1</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Linux Essentials & OS Fundamentals</p>
              <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm font-medium text-gray-800 dark:text-gray-200 rounded-full">
                {quiz1Data.length} Questions
              </span>
            </button>

            {/* QUIZ 2 CARD */}
            <button 
              onClick={() => handleSelectQuiz('quiz2')}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-6 text-left shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-transparent hover:border-amber-500 dark:hover:border-amber-400"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center">
                  <span className="font-bold text-amber-600 dark:text-amber-400 text-xl">2</span>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">QUIZ 2</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Coming Soon...</p>
              <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm font-medium text-gray-800 dark:text-gray-200 rounded-full">
                {quiz2Data.length} Questions
              </span>
            </button>
          </div>
        </div>
      );
    }

    if (showResults) {
      const score = calculateScore();
      const percentage = Math.round((score / activeQuestions.length) * 100);
      const hasMissed = score < activeQuestions.length;

      return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto min-h-screen">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors">
            <div className="bg-blue-600 dark:bg-blue-800 p-8 text-center text-white relative">
              <div className="absolute top-4 right-4 flex gap-2">
                <button onClick={exitQuiz} className="p-2 rounded-full hover:bg-white/20 transition-colors" title="Back to Quizzes">
                  <Home className="w-6 h-6" />
                </button>
                <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-white/20 transition-colors" title="Toggle Dark Mode">
                  {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                </button>
              </div>
              <Award className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2 text-white">Exam Results</h1>
              <p className="text-xl text-white">You scored {score} out of {activeQuestions.length} ({percentage}%)</p>
              {percentage >= 80 ? (
                <p className="mt-2 text-green-300 font-semibold">Excellent! You are ready for the exam! 🚀</p>
              ) : (
                <p className="mt-2 text-yellow-300 font-semibold">Good effort! Review the missed questions below to perfect your knowledge.</p>
              )}
            </div>
            
            <div className="p-8 space-y-8 h-[60vh] overflow-y-auto">
              {activeQuestions.map((q, idx) => {
                const isCorrect = checkAnswer(q.id);
                return (
                  <div key={q.id} className={`p-6 rounded-lg border-l-4 ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-green-500' : 'bg-red-50 dark:bg-red-900/20 border-red-500'}`}>
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {isCorrect ? <CheckCircle2 className="text-green-600 dark:text-green-400" /> : <XCircle className="text-red-600 dark:text-red-400" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Q{idx + 1}: {q.text}</h3>
                        
                        <div className="mb-3 space-y-1 text-sm">
                          <p>
                            <span className="font-medium text-gray-600 dark:text-gray-400">Your Answer: </span>
                            <span className={isCorrect ? 'text-green-700 dark:text-green-400 font-medium' : 'text-red-700 dark:text-red-400 font-medium'}>
                              {q.type === 'multiple' 
                                ? (userAnswers[q.id]?.join(', ') || 'None') 
                                : (userAnswers[q.id] || 'None')}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p>
                              <span className="font-medium text-gray-600 dark:text-gray-400">Correct Answer: </span>
                              <span className="text-green-700 dark:text-green-400 font-medium">
                                {q.type === 'multiple' ? q.correctAnswer.join(', ') : q.correctAnswer}
                              </span>
                            </p>
                          )}
                        </div>
                        
                        <div className="mt-3 text-sm bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                          <span className="font-bold text-blue-800 dark:text-blue-400">Explanation:</span> {q.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800/80 border-t dark:border-gray-700 flex flex-wrap justify-center gap-4">
              <button onClick={restartQuiz} className="flex items-center gap-2 px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-sm">
                <RotateCcw className="w-5 h-5" /> Retake All
              </button>
              {hasMissed && (
                <button onClick={retakeMissed} className="flex items-center gap-2 px-6 py-3 bg-amber-500 dark:bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-600 dark:hover:bg-amber-500 transition-colors shadow-sm">
                  <RefreshCw className="w-5 h-5" /> Retake Missed Only
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (!question) return null;

    return (
      <div className="flex items-center justify-center p-4 min-h-screen">
        <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-[500px] transition-colors">
          {/* Header & Progress */}
          <div className="bg-blue-600 dark:bg-blue-800 text-white p-6 relative">
            <div className="absolute top-6 right-6 flex gap-3">
              <button onClick={exitQuiz} className="p-2 rounded-full hover:bg-white/20 transition-colors" title="Back to Quizzes">
                <Home className="w-5 h-5" />
              </button>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-white/20 transition-colors" title="Toggle Dark Mode">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
            <div className="flex justify-between items-center mb-4 pr-24">
              <h2 className="text-xl font-bold text-white">
                {selectedQuizId === 'quiz1' ? 'QUIZ 1: Linux Essentials' : 'QUIZ 2'}
              </h2>
              <span className="font-medium bg-blue-700 dark:bg-blue-900 px-3 py-1 rounded-full text-sm text-white">
                Question {currentQuestionIndex + 1} of {activeQuestions.length}
              </span>
            </div>
            <div className="w-full bg-blue-800 dark:bg-blue-900 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full transition-all duration-300" style={{ width: `${((currentQuestionIndex) / activeQuestions.length) * 100}%` }}></div>
            </div>
          </div>

          {/* Question Area */}
          <div className="p-8 flex-1 flex flex-col">
            <h3 className="text-2xl font-semibold mb-6 leading-snug text-gray-900 dark:text-white">
              {question.text}
            </h3>

            <div className="space-y-3 flex-1">
              {question.type === 'single' && question.options.map((option, idx) => (
                <label key={idx} className={`flex items-center p-4 border rounded-xl transition-all ${isChecked ? 'cursor-default' : 'cursor-pointer'} ${getOptionStyles(option)}`}>
                  <input 
                    type="radio" 
                    name={`q-${question.id}`} 
                    value={option}
                    checked={userAnswers[question.id] === option}
                    onChange={() => handleSingleSelect(option)}
                    disabled={isChecked}
                    className="w-5 h-5 text-blue-600 dark:text-blue-500 border-gray-300 dark:border-gray-600 focus:ring-blue-500 disabled:opacity-50 dark:bg-gray-700"
                  />
                  <span className="ml-3 text-lg">{option}</span>
                </label>
              ))}

              {question.type === 'multiple' && (
                <>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-3">Select all that apply:</p>
                  {question.options.map((option, idx) => {
                    const isOptionChecked = (userAnswers[question.id] || []).includes(option);
                    return (
                      <label key={idx} className={`flex items-center p-4 border rounded-xl transition-all ${isChecked ? 'cursor-default' : 'cursor-pointer'} ${getOptionStyles(option)}`}>
                        <input 
                          type="checkbox" 
                          checked={isOptionChecked}
                          onChange={() => handleMultiSelect(option)}
                          disabled={isChecked}
                          className="w-5 h-5 text-blue-600 dark:text-blue-500 rounded border-gray-300 dark:border-gray-600 focus:ring-blue-500 disabled:opacity-50 dark:bg-gray-700"
                        />
                        <span className="ml-3 text-lg">{option}</span>
                      </label>
                    );
                  })}
                </>
              )}

              {question.type === 'text' && (
                <div className="mt-4">
                  <input 
                    type="text"
                    value={userAnswers[question.id] || ''}
                    onChange={handleTextChange}
                    disabled={isChecked}
                    placeholder="Type your answer here..."
                    className={`w-full p-4 border rounded-xl text-lg outline-none transition-all ${
                      isChecked 
                        ? isCurrentCorrect 
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-900 dark:text-green-300'
                          : 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-900 dark:text-red-300'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  />
                </div>
              )}
              
              {/* Immediate Feedback Container */}
              {isChecked && (
                <div className={`mt-6 p-5 rounded-xl border-l-4 shadow-sm ${isCurrentCorrect ? 'bg-green-50 dark:bg-green-900/20 border-green-500' : 'bg-red-50 dark:bg-red-900/20 border-red-500'}`}>
                  <div className="flex items-start gap-4">
                    {isCurrentCorrect ? (
                      <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0" />
                    )}
                    <div>
                      <h4 className={`text-lg font-bold ${isCurrentCorrect ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                        {isCurrentCorrect ? 'Correct!' : 'Incorrect'}
                      </h4>
                      
                      {!isCurrentCorrect && question.type !== 'single' && (
                        <p className="mt-2 text-red-900 dark:text-red-200 font-medium bg-white/60 dark:bg-black/20 inline-block px-3 py-1 rounded">
                          Correct Answer:{' '}
                          {Array.isArray(question.correctAnswer) ? question.correctAnswer.join(', ') : question.correctAnswer}
                        </p>
                      )}
                      
                      <p className="mt-3 text-gray-800 dark:text-gray-200 leading-relaxed">
                        <span className="font-bold text-gray-900 dark:text-white block mb-1">Explanation:</span> 
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="p-6 bg-gray-50 dark:bg-gray-800/80 border-t dark:border-gray-700 flex justify-between items-center">
            <button 
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-colors ${
                currentQuestionIndex === 0 
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <ArrowLeft className="w-5 h-5" /> Previous
            </button>
            
            {!isChecked ? (
              <button 
                onClick={handleCheckQuestion}
                disabled={!isCurrentQuestionAnswered()}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all shadow-sm ${
                  isCurrentQuestionAnswered() 
                  ? 'bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500' 
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                }`}
              >
                Check Answer
              </button>
            ) : (
              <button 
                onClick={nextQuestion}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 dark:bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-sm"
              >
                {currentQuestionIndex === activeQuestions.length - 1 ? 'Finish Quiz' : 'Next'} <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // The wrapper guarantees the "dark" class applies properly down the entire DOM tree
  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans transition-colors duration-200">
        {renderContent()}
      </div>
    </div>
  );
}