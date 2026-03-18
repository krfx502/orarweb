import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, RotateCcw, Award, RefreshCw, Home, Lock, ChevronRight } from 'lucide-react';

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
    explanation: "In Linux/Unix, directories in the PATH variable are separated by a colon (:). '/' is the directory separator for file paths, not the PATH list separator."
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
    explanation: "The ASCII decimal value for a dot/period (.) is 46."
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
    explanation: "Interpreted languages are translated on the fly and generally offer higher-level features (like dynamic typing) at the cost of using more resources."
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
    explanation: "Brace expansion creates strings regardless of file existence. Globs (*, ?, []) only return results if files actually exist matching that pattern."
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
    explanation: "MBR and GPT are the actual structures defining partitions on a disk."
  },
  {
    id: 10,
    text: "The `fdisk` command is a tool used for working with the MBR partitioned disks. True or False?",
    type: "single",
    options: ["Adevărat (True)", "Fals (False)"],
    correctAnswer: "Adevărat (True)",
    explanation: "fdisk is the classic tool for MBR partitioning."
  },
  {
    id: 11,
    text: "Which of the following commands will check hard disk MBR partitions? (choose three)",
    type: "multiple",
    options: ["gdisk", "sfdisk", "fdisk", "cfdisk", "gfdisk"],
    correctAnswer: ["sfdisk", "fdisk", "cfdisk"],
    explanation: "fdisk, cfdisk, and sfdisk all manipulate MBR partition tables. gdisk is for GPT."
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
    explanation: "Standard apps run in 'user' mode and use 'system calls' to request services from the 'kernel'."
  },
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
    explanation: "Typing `cd` without arguments defaults to taking you to your home directory (~)."
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
    explanation: "Open source guarantees access to code and the right to modify it. You ARE actually allowed to sell open source software, and you don't always have to redistribute changes."
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
    explanation: "`!string` executes the most recent command starting with that string. `!!` runs the very last command."
  },
  {
    id: 39,
    text: "The `jamie` user already exists in the system. The command `grep jamie /etc/passwd` displays one user record. Running the `echo $?` command immediately after would result in what output?",
    type: "single",
    options: ["1", "5", "2", "0"],
    correctAnswer: "0",
    explanation: "Because `grep` successfully found the record, it exits with a success status, which in Bash is 0."
  },
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
    explanation: "Monolithic kernels run OS services in kernel space. Microkernels run only the bare minimum in kernel space and move services to user space."
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
    explanation: "Linux is monolithic, sharing a single kernel address space for its services. Minix is the classic example of a microkernel architecture."
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
    explanation: "man = manual pages. apropos = keyword search. whatis = brief description. help = built-in help."
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
    explanation: "The `set` command creates local shell variables, not environment variables. `export` or `declare -x` creates environment variables."
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
    explanation: "Both `env` and `printenv` will print out currently exported environment variables."
  }
];

const quiz2Data = [
  {
    id: 101,
    text: "Complete the Bash script to process all .txt files in the current directory:\n\n#!/bin/bash\n____ file in *.txt; do\n  echo \"Processing: $file\"\n  wc -l \"$file\"\n____",
    type: "single",
    options: [
      "for / done",
      "while / done",
      "for / fi",
      "if / fi"
    ],
    correctAnswer: "for / done",
    explanation: "A `for` loop iterates over a list of items; the loop is closed with the `done` keyword."
  },
  {
    id: 102,
    text: "With globstar enabled, what does `**` match in a path?",
    type: "single",
    options: [
      "Same as single * (one directory level)",
      "Files with any two-character extension",
      "Two asterisks literally",
      "All files and directories recursively through subdirectories"
    ],
    correctAnswer: "All files and directories recursively through subdirectories",
    explanation: "With `shopt -s globstar`, `**` matches files and subdirectories recursively."
  },
  {
    id: 103,
    text: "Evaluate the following code that processes user input and deletes files. Which issue is the most serious?\n\nfiles=$(ls \"$input_dir\")\nfor f in $files; do\n  rm \"$f\"\ndone",
    type: "single",
    options: [
      "Using ls for iteration is fragile; globbing or find-based iteration is preferable",
      "Unquoted variables can cause word splitting and unintended glob expansion",
      "A missing shebang affects portability but is not the primary safety risk",
      "The presence/absence of -rf is not the core issue here"
    ],
    correctAnswer: "Using ls for iteration is fragile; globbing or find-based iteration is preferable",
    explanation: "Parsing `ls` is a major anti-pattern. If filenames contain spaces, the loop will split them into multiple arguments and potentially delete the wrong files."
  },
  {
    id: 104,
    text: "Complete the pipeline to compute word frequencies in file.txt and sort them by descending count:\n\ntr -s ' ' '\\n' < file.txt | ____ | ____ | ____",
    type: "single",
    options: [
      "sort / uniq -c / sort -nr",
      "uniq -c / sort / sort -n",
      "sort / uniq / sort -r",
      "uniq / sort -c / sort -nr"
    ],
    correctAnswer: "sort / uniq -c / sort -nr",
    explanation: "First `sort` groups identical lines, `uniq -c` counts them, and `sort -nr` sorts the results numerically in reverse."
  },
  {
    id: 105,
    text: "What does the `&>` redirection operator do in Bash?",
    type: "single",
    options: [
      "Redirects stdout to a file (overwrite)",
      "Redirects both stdout and stderr to a file",
      "Reads input from a file",
      "Redirects stdout to a file (append)"
    ],
    correctAnswer: "Redirects both stdout and stderr to a file",
    explanation: "`&>` is a shortcut to redirect both file descriptor 1 (stdout) and 2 (stderr) to the same file."
  },
  {
    id: 106,
    text: "With extglob enabled, which pattern matches files that do NOT end in .txt?",
    type: "single",
    options: [
      "*.!txt",
      "~(*.txt)",
      "!(*.txt)",
      "[!*.txt]"
    ],
    correctAnswer: "!(*.txt)",
    explanation: "In extended globbing, `!(pattern)` negates the match."
  },
  {
    id: 107,
    text: "In general, for which of the following would you want to use lossless compression?",
    type: "single",
    options: [
      "A log file",
      "A movie",
      "An mp3 audio file",
      "A JPEG image"
    ],
    correctAnswer: "A log file",
    explanation: "Data integrity is critical for text/logs, requiring lossless compression. Multimedia often uses lossy compression."
  },
  {
    id: 108,
    text: "A process transitions to the 'ready' state from 'waiting' when:",
    type: "single",
    options: [
      "The awaited event occurs",
      "A higher priority process arrives",
      "The scheduler selects it",
      "The time quantum expires"
    ],
    correctAnswer: "The awaited event occurs",
    explanation: "When the event (like I/O completion) that blocked the process happens, it moves to the ready queue."
  },
  {
    id: 109,
    text: "What is the primary purpose of the `xargs` command?",
    type: "single",
    options: [
      "Exports variables to subprocesses",
      "Builds and executes command lines from stdin",
      "Parses XML arguments",
      "Displays command arguments"
    ],
    correctAnswer: "Builds and executes command lines from stdin",
    explanation: "`xargs` transforms standard input into arguments for other commands."
  },
  {
    id: 110,
    text: "A CPU burst is:",
    type: "single",
    options: [
      "The time spent waiting in ready queue",
      "A period during which a process uses the CPU continuously",
      "Time between creation and termination",
      "Total execution time"
    ],
    correctAnswer: "A period during which a process uses the CPU continuously",
    explanation: "A CPU burst is the duration of active processing before the process blocks or is preempted."
  },
  {
    id: 111,
    text: "Which two commands reload the `~/.bashrc` configuration in the current shell session? (Select two)",
    type: "multiple",
    options: [
      "source ~/.bashrc",
      "exec ~/.bashrc",
      ". ~/.bashrc",
      "bash ~/.bashrc"
    ],
    correctAnswer: [
      "source ~/.bashrc",
      ". ~/.bashrc"
    ],
    explanation: "`source` and `.` execute scripts in the current shell environment."
  },
  {
    id: 112,
    text: "UNIX was created in ______ by Ken Thompson and Dennis Ritchie at ______. The Linux kernel was first released in ______ by Linus Torvalds.",
    type: "single",
    options: [
      "1969 / Bell Labs / 1991",
      "1970 / MIT / 1995",
      "1969 / GNU / 1991",
      "1980 / Berkeley / 1994"
    ],
    correctAnswer: "1969 / Bell Labs / 1991",
    explanation: "UNIX originated at Bell Labs in 1969; Linux was released in 1991."
  },
  {
    id: 113,
    text: "Complete the commands to create an exported variable and verify it in a child process:\n\n____ MY_APP=\"running\"\nbash ____ 'echo ____'",
    type: "single",
    options: [
      "export / -c / $MY_APP",
      "set / -x / $MY_APP",
      "declare / -e / MY_APP",
      "env / -c / MY_APP"
    ],
    correctAnswer: "export / -c / $MY_APP",
    explanation: "`export` makes the variable available to subshells like `bash -c`."
  },
  {
    id: 114,
    text: "Which command displays lines 5-10 from a file?",
    type: "single",
    options: [
      "head -n 10 file | tail -n 6",
      "tail -n 10 file | head -n 6",
      "cat file | lines 5-10"
    ],
    correctAnswer: "head -n 10 file | tail -n 6",
    explanation: "Grabbing the first 10 lines and then taking the last 6 gives you lines 5 through 10."
  },
  {
    id: 115,
    text: "What command removes consecutive duplicate lines from sorted input?\n\nEnter the command name only.",
    type: "text",
    correctAnswer: "uniq",
    explanation: "`uniq` removes adjacent duplicate lines."
  },
  {
    id: 116,
    text: "In Bash filename expansion (globbing), what does the bracket expression `[^abc]` match?",
    type: "single",
    options: [
      "Any character from a to c, including a and c",
      "No character at all",
      "Any character except a, b, or c",
      "Only the letters a, b, and c"
    ],
    correctAnswer: "Any character except a, b, or c",
    explanation: "The caret `^` at the start of brackets negates the set."
  },
  {
    id: 117,
    text: "What is the name of the scheduling algorithm that selects the process with the shortest next CPU burst? \n\n(Consequence Selection)",
    type: "single",
    options: [
      "The algorithm degrades into FCFS behavior",
      "Physical memory consumption increases",
      "Context switch overhead increases significantly",
      "Processes enter starvation and never get enough CPU time"
    ],
    correctAnswer: "Processes enter starvation and never get enough CPU time",
    explanation: "Shortest Job First (SJF) can lead to starvation for long processes."
  },
  {
    id: 118,
    text: "Complete the properties of SJF scheduling:\n\nSJF selects the process with the ______ CPU burst. It is provably ______ for minimising average ______. The main challenge is that burst duration must be ______ using techniques like exponential averaging.",
    type: "single",
    options: [
      "shortest / optimal / waiting time / predicted",
      "longest / suboptimal / turnaround time / measured",
      "shortest / optimal / response time / ignored",
      "shortest / optimal / execution time / randomized"
    ],
    correctAnswer: "shortest / optimal / waiting time / predicted",
    explanation: "SJF is optimal for waiting time but requires burst prediction."
  },
  {
    id: 119,
    text: "What does the `cut` filter do?",
    type: "single",
    options: [
      "Changes the case of characters in a text stream.",
      "Filters lines based on their length.",
      "Extracts specific columns from a delimited file.",
      "Converts numerical data into text."
    ],
    correctAnswer: "Extracts specific columns from a delimited file.",
    explanation: "`cut` extracts fields or columns from text."
  },
  {
    id: 120,
    text: "Which of the following commands will create a zipfile with the contents of your Documents directory?",
    type: "single",
    options: [
      "zip -c mydocs.zip Documents",
      "zip -f mydocs.zip Documents",
      "zip -r mydocs.zip Documents",
      "zip mydocs.zip Documents",
      "zip -cf mydocs.zip Documents"
    ],
    correctAnswer: "zip -r mydocs.zip Documents",
    explanation: "The `-r` flag is required for recursive directory zipping."
  },
  {
    id: 121,
    text: "To send a signal to a set of processes with the same name, you can run:",
    type: "single",
    options: [
      "sigkill",
      "allkill",
      "grpkill",
      "killall"
    ],
    correctAnswer: "killall",
    explanation: "`killall` targets processes by name rather than PID."
  },
  {
    id: 122,
    text: "What does exit code 0 indicate?",
    type: "single",
    options: [
      "Warning",
      "Success",
      "Error",
      "Interrupted"
    ],
    correctAnswer: "Success",
    explanation: "0 represents successful completion."
  },
  {
    id: 123,
    text: "The command `cmd1 && cmd2` runs cmd2 only if cmd1 ______, while `cmd1 || cmd2` runs cmd2 only if cmd1 ______.",
    type: "single",
    options: [
      "succeeds / fails",
      "fails / succeeds",
      "executes / terminates",
      "starts / finishes"
    ],
    correctAnswer: "succeeds / fails",
    explanation: "&& is logical AND; || is logical OR/fallback."
  },
  {
    id: 124,
    text: "Which of the following is NOT a valid way to send the force kill signal to a process?",
    type: "single",
    options: [
      "kill -FORCE PID",
      "kill -SIGKILL PID",
      "kill -9 PID",
      "kill -KILL PID"
    ],
    correctAnswer: "kill -FORCE PID",
    explanation: "There is no '-FORCE' flag in the standard kill command. Valid ways include numeric '-9' or names like '-KILL' or '-SIGKILL'."
  },
  {
    id: 125,
    text: "In Bash, ______ exits the current loop entirely, while ______ skips to the next iteration.",
    type: "single",
    options: [
      "break / continue",
      "exit / skip",
      "continue / break",
      "stop / next"
    ],
    correctAnswer: "break / continue",
    explanation: "`break` breaks the loop entirely; `continue` skips the rest of the current loop body and moves to the next iteration."
  },
  {
    id: 126,
    text: "Which command would you use to archive the Documents directory and compress it with bzip2 compression?",
    type: "single",
    options: [
      "tar -fzc Documents documents.tbz",
      "tar -cf Documents documents.tbz",
      "tar -cjf documents.tbz Documents",
      "tar -cjf Documents",
      "tar -czf documents.tbz"
    ],
    correctAnswer: "tar -cjf documents.tbz Documents",
    explanation: "`-c` creates, `-j` uses bzip2, and `-f` specifies the filename. The destination file must come before the source directory in this syntax."
  },
  {
    id: 127,
    text: "Complete the command sequence to save the process list and then count how many lines match python:\n\nps aux > procs.log; grep python procs.log | ____ -l",
    type: "single",
    options: ["wc", "cut", "awk", "sort", "uniq"],
    correctAnswer: "wc",
    explanation: "`wc -l` counts the number of lines resulting from the grep filter."
  },
  {
    id: 128,
    text: "Assume a Bash script enables strict mode with `set -euo pipefail` and then executes `x=\"${UNDEFINED_VAR}\"`. What happens next?",
    type: "single",
    options: [
      "Depends on Bash version",
      "Displays 'Continues...' with x=\"\"",
      "Error: unbound variable",
      "Displays 'Continues...' with x=\"UNDEFINED_VAR\""
    ],
    correctAnswer: "Error: unbound variable",
    explanation: "The `-u` option in `set -u` causes the script to exit immediately with an error if it attempts to use an undefined variable."
  },
  {
    id: 129,
    text: "You type `gzip myfile.tar`. What happens? (Select TWO)",
    type: "multiple",
    options: [
      "myfile.tar is removed",
      "myfile.tar is unarchived into the current directory",
      "myfile.tar.gz holds a compressed version of myfile.tar",
      "An error; you forgot to pass the name of the output file",
      "An error; you forgot to specify the file with -f"
    ],
    correctAnswer: [
      "myfile.tar is removed",
      "myfile.tar.gz holds a compressed version of myfile.tar"
    ],
    explanation: "By default, `gzip` compresses the file, adds the `.gz` extension, and deletes the original file."
  },
  {
    id: 130,
    text: "Waiting time in process scheduling is calculated as:",
    type: "single",
    options: [
      "Priority level",
      "CPU burst length",
      "Memory requirements",
      "Time spent waiting in the ready queue"
    ],
    correctAnswer: "Time spent waiting in the ready queue",
    explanation: "Waiting time is the total sum of periods a process spends waiting in the ready queue to get access to the CPU."
  },
  {
    id: 131,
    text: "Which redirection writes a command's standard error (stderr) to errors.log, overwriting the file if it exists, while leaving standard output (stdout) on the terminal?",
    type: "single",
    options: [
      "command 2>> errors.log",
      "command 2> errors.log",
      "command > errors.log",
      "command &> errors.log"
    ],
    correctAnswer: "command 2> errors.log",
    explanation: "Descriptor `2>` specifically targets standard error and `>` overwrites the file. `&>` would redirect both stdout and stderr."
  },
  {
    id: 132,
    text: "Complete the pipeline to count how many unique user names appear in /etc/passwd:\n\n____ -d: -f1 /etc/passwd | ____ | ____ | ____ -l",
    type: "single",
    options: [
      "cut / sort / uniq / wc",
      "grep / awk / cut / uniq",
      "awk / cut / sort / uniq",
      "sort / uniq / wc / grep"
    ],
    correctAnswer: "cut / sort / uniq / wc",
    explanation: "1. `cut` extracts the first field (usernames). 2. `sort` groups identical names. 3. `uniq` removes duplicates. 4. `wc -l` counts the lines."
  },
  {
    id: 133,
    text: "Which versions of regular expression syntax are commonly distinguished?",
    type: "single",
    options: [
      "There is only one standard syntax",
      "The syntax depends on the specific tool being used",
      "BRE and ERE are the same",
      "Basic (BRE), Extended (ERE), Perl Compatible (PCRE)"
    ],
    correctAnswer: "Basic (BRE), Extended (ERE), Perl Compatible (PCRE)",
    explanation: "Linux tools typically distinguish between Basic (standard grep), Extended (egrep/-E), and Perl-style (grep -P) regex."
  },
  {
    id: 134,
    text: "What does a range (e.g., a-z) within square brackets match in shell scripting?",
    type: "single",
    options: [
      "Any single character within the range",
      "A random character from the range",
      "The exact sequence of characters in the range",
      "None of the characters in the range"
    ],
    correctAnswer: "Any single character within the range",
    explanation: "Bracket ranges like [a-z] match exactly one character from the specified set/range."
  },
  {
    id: 135,
    text: "Complete the fork() return value logic:\n\npid_t pid = fork();\nif (pid == ____ ) { // Child process\n} else if (pid > 0) { // Parent process\n  // pid contains the ____'s PID\n}",
    type: "single",
    options: [
      "0 / child",
      "1 / child",
      "0 / parent",
      "-1 / sibling"
    ],
    correctAnswer: "0 / child",
    explanation: "fork() returns 0 to the child process and the child's PID to the parent process."
  },
  {
    id: 136,
    text: "What command translates or deletes characters from input?",
    type: "text",
    correctAnswer: "tr",
    explanation: "The 'tr' (translate) command is used for translating or deleting characters from a stream."
  },
  {
    id: 137,
    text: "Response time in CPU scheduling is calculated as:",
    type: "single",
    options: [
      "Average waiting time",
      "Time from submission until the first response is produced",
      "Total time taken from submission to completion",
      "CPU utilization percentage"
    ],
    correctAnswer: "Time from submission until the first response is produced",
    explanation: "Response time measures the time between submitting a request and the first response being generated (not the final output)."
  },
  {
    id: 138,
    text: "Compression of a file works by:",
    type: "single",
    options: [
      "Eliminating gaps within the file",
      "Consolidating multiple files into one",
      "Removing the high order bit from each byte",
      "Removing redundant information"
    ],
    correctAnswer: "Removing redundant information",
    explanation: "Compression algorithms identify and remove or encode repetitive/redundant data patterns to reduce file size."
  },
  {
    id: 139,
    text: "What does the expression file{1,2,3}.txt expand to in Bash?",
    type: "single",
    options: [
      "file123.txt",
      "file[1-3].txt",
      "file1.txt file2.txt file3.txt",
      "file(1,2,3).txt"
    ],
    correctAnswer: "file1.txt file2.txt file3.txt",
    explanation: "Brace expansion generates multiple strings by prepending and appending text to the items listed inside the braces."
  },
  {
    id: 140,
    text: "How can you force grep to interpret a string as an Extended Regular Expression (ERE)?",
    type: "single",
    options: [
      "Use the -E flag with grep",
      "Use the -P flag with grep",
      "ERE is the default; no option needed",
      "You cannot force ERE in grep"
    ],
    correctAnswer: "Use the -E flag with grep",
    explanation: "The -E flag (or using the 'egrep' command) enables Extended Regular Expression support."
  },
  {
    id: 141,
    text: "Consider the following script executed as './test.sh SCRIPT':\n\nshow_arg() { echo \"$1\"; }\necho \"$1\"\nshow_arg \"FUNC\"\n\nWhat does the function 'show_arg' print?",
    type: "single",
    options: [
      "(empty)",
      "$1",
      "SCRIPT",
      "FUNC"
    ],
    correctAnswer: "FUNC",
    explanation: "Inside a function, $1 refers to the function's own first argument, which is 'FUNC' in this call."
  },
  {
    id: 142,
    text: "Match system types to their best scheduling algorithm:\n1. Batch systems: ____\n2. Interactive systems: ____\n3. Mixed workloads: ____",
    type: "single",
    options: [
      "SJF / Round Robin / MLFQ",
      "Round Robin / FCFS / SJF",
      "FCFS / MLFQ / Round Robin",
      "Priority / SJF / Round Robin"
    ],
    correctAnswer: "SJF / Round Robin / MLFQ",
    explanation: "Shortest Job First is great for Batch (minimizing turnaround). Round Robin is ideal for Interactive (response time). Multi-Level Feedback Queues (MLFQ) handle mixed loads."
  },
  {
    id: 143,
    text: "What does shopt -s dotglob enable?",
    type: "single",
    options: [
      "Enables graphical glob interface",
      "Globs match hidden files [dotfiles]",
      "Shows dots instead of unmatched patterns",
      "Enables pattern debugging"
    ],
    correctAnswer: "Globs match hidden files [dotfiles]",
    explanation: "By default, shell wildcards (globs) do not match files starting with a dot (hidden files). Enabling 'dotglob' allows patterns like '*' to include them."
  },
  {
    id: 144,
    text: "What is the correct way to save the current directory to a variable?",
    type: "single",
    options: [
      "A=cwd",
      "pwd | $A",
      "pwd $A",
      "A=pwd",
      "A=`pwd`"
    ],
    correctAnswer: "A=`pwd`",
    explanation: "Command substitution using backticks (or $( )) executes the command and assigns its standard output to the variable."
  }
];

const secretQuizData = [
  { id: 2001, text: "What does CLI stand for?", type: "single", options: ["Core Learning Interface", "Command Learning Interface", "Core Line Interface", "Command Line Interface"], correctAnswer: "Command Line Interface", explanation: "" },
   { id: 2002, text: "Commands are case-sensitive. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2003, text: "When entering a command, do arguments or options typically come first?", type: "single", options: ["Options", "Arguments"], correctAnswer: "Options", explanation: "" },
  { id: 2004, text: "Which of the following is NOT a correct way to combine options?", type: "single", options: ["-l -r", "-lr", "-r l", "-rl"], correctAnswer: "-r l", explanation: "" },
  { id: 2005, text: "Which command will print your current location in the filesystem?", type: "single", options: ["pcl", "pwd", "pd", "cd"], correctAnswer: "pwd", explanation: "" },
  { id: 2006, text: "Which command will allow you to change your current directory?", type: "single", options: ["ls", "cd", "ch", "chdir"], correctAnswer: "cd", explanation: "" },
  { id: 2007, text: "Which of the following is NOT an example of an absolute path?", type: "single", options: ["/", "/home/sysadmin", "Documents"], correctAnswer: "Documents", explanation: "" },
  { id: 2008, text: "Which of the following is NOT an example of a relative path?", type: "single", options: ["Documents", "/home", "Documents/Work", "home/sysadmin/Documents/School/Art"], correctAnswer: "/home", explanation: "" },
  { id: 2009, text: "The ~ (tilde) character is used to represent:", type: "single", options: ["A users home directory", "Nothing, it doesnt have a special meaning", "The current directory", "The directory abo've the current directory"], correctAnswer: "A users home directory", explanation: "" },
  { id: 2010, text: "The .. (double period) characters are used to represent:", type: "single", options: ["A users home directory", "The current directory", "Nothin'g, it doesnt have a special", "The directory above the current directory"], correctAnswer: "The directory above the current directory", explanation: "" },
  { id: 2011, text: "The . (period) character is used to represent:", type: "single", options: ["The directory above the current directory", "A users home directory", "The current directory", "Nothing, it doesnt have a special meaning"], correctAnswer: "The current directory", explanation: "" },
  { id: 2012, text: "The  ls command without options or arguments…", type: "single", options: ["…lists the contents of the current directory.", "s home.", "…prompts for a directory to list."], correctAnswer: "…lists the contents of the current directory.", explanation: "" },
  { id: 2013, text: "The… lifsitrss thte c chonaternatcs toef ar uisner a long listing …generates an error as this command. ls - l indicates:", type: "single", options: ["Hard Link Count", "File Size", "Permissions", "File Type"], correctAnswer: "File Type", explanation: "" },
  { id: 2014, text: "Which option to the ls will sort the output by file size?", type: "single", options: ["-z", "-r", "-S", "-s"], correctAnswer: "-S", explanation: "" },
  { id: 2015, text: "Which of these commands will create a new shell logged in as the root user?", type: "single", options: ["sudo", "su"], correctAnswer: "su", explanation: "" },
  { id: 2016, text: "Which of the following sets has the owner permissions highlighted?", type: "single", options: ["rw-rw-r –", "rw-rw-r", "rw-rw-r", "rw-rw-r–"], correctAnswer: "rw-rw-r –", explanation: "" },
  { id: 2017, text: "Which of– the following sets has the group – permissions highlighted?", type: "single", options: ["rw-rw-r", "rw-rw-r", "– – rw-rw-r –", "rw-rw-r"], correctAnswer: "– – rw-rw-r –", explanation: "" },
  { id: 2018, text: "Which of the following sets has the other – permissions highlighted?", type: "single", options: ["rw-rw-r", "– rw-rw-r –", "rw-rw-r", "rw-rw-r"], correctAnswer: "– rw-rw-r –", explanation: "" },
  { id: 2019, text: "Which co–mmand will allow a user to change the – permissions of a file?", type: "single", options: ["perm", "chown", "chmod", "chperm"], correctAnswer: "chmod", explanation: "" },
  { id: 2020, text: "Which of the following permission sets indicates the other owner has only the read permission?", type: "single", options: ["rw-r rwx", "rwxrw-r-x", "r r r–-x", "– – rw-rw-r –"], correctAnswer: "– – rw-rw-r –", explanation: "" },
  { id: 2021, text: "Which of the following commands is used to change the ownership of a file?", type: "single", options: ["chow", "chmod", "chown", "chperm"], correctAnswer: "chown", explanation: "" },
  { id: 2022, text: "Changing the user owner of a file requires administrative access. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2023, text: "Which of the following commands can be used to rename a file?", type: "single", options: ["name", "cp", "rn", "mv"], correctAnswer: "mv", explanation: "" },
  { id: 2024, text: "The mv command requires at least two arguments. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2025, text: "Which command can be used to copy a file?", type: "single", options: ["mv", "rm", "cy", "cp"], correctAnswer: "cp", explanation: "" },
  { id: 2026, text: "The cp command requires at least two arguments. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2027, text: "Which command is used to copy files at the bit level?", type: "single", options: ["cp", "dd"], correctAnswer: "dd", explanation: "" },
  { id: 2028, text: "The rm command requires at least two arguments. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2029, text: "Which option to the rm command will allow a user to delete directories?", type: "single", options: ["-l", "-r", "-d", "-a"], correctAnswer: "-r", explanation: "" },
  { id: 2030, text: "Which of the following commands is used to filter text?", type: "single", options: ["text", "grep", "dd", "regex"], correctAnswer: "grep", explanation: "" },
  { id: 2031, text: "Which of the following commands will return only lines that begin with test?", type: "single", options: ["grep ^test file.txt ‘", "grep $test file.txt", "grep *test file.txt", "grep ‘[test] file.txt"], correctAnswer: "grep ^test file.txt ‘", explanation: "" },
  { id: 2032, text: "Which‘ of t'he following commands will return ‘  only lines that end with test?", type: "single", options: ["grep $test file.txt", "‘  grep test$ file.txt ‘", "grep test^ file.txt ‘", "grep ^test file.txt"], correctAnswer: "‘  grep test$ file.txt ‘", explanation: "" },
  { id: 2033, text: "Which of the following lines would be NOT ‘  returned by the grep ‘[^0-9] file.txt command?", type: "single", options: ["I am 37 years old.", "My favorite food is avocados.", "3121991", "Hello my name is Joe."], correctAnswer: "3121991", explanation: "" },
  { id: 2034, text: "Which of the following lines would be returned by the grep ‘b[oe]t file.txt command?", type: "single", options: ["beet", "bet", "boet", "boot"], correctAnswer: "bet", explanation: "" },
  { id: 2035, text: "Which of the following commands will NOT shutdown the system immediately?", type: "single", options: ["shutdown", "shutdown now", "shutdown now Goodbye World!", "shutdown +0"], correctAnswer: "shutdown now", explanation: "" },
  { id: 2036, text: "Which of the ‘following co'mmands can be used to display network configuration information?", type: "single", options: ["netconfig", "pwd", "ifconfig", "net"], correctAnswer: "ifconfig", explanation: "" },
  { id: 2037, text: "Which of the following commands will display every process?", type: "single", options: ["ps all", "– ps -e", "ps", "ps -a"], correctAnswer: "– ps -e", explanation: "" },
  { id: 2038, text: "The ps command requires administrative access. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2039, text: "Which of the following commands will update all packages?", type: "single", options: ["apt-get upgrade", "apt-get update", "apt-get install", "apt-get search"], correctAnswer: "apt-get upgrade", explanation: "" },
  { id: 2040, text: "Which of the following will delete all of a package's files?", type: "single", options: ["apt-get remove", "apt-get delete", "apt-get purge", "apt-get trash"], correctAnswer: "apt-get purge", explanation: "" },
  { id: 2041, text: "Which of the following commands should be executed before installing a package?", type: "single", options: ["apt-get upgrade", "apt-get update", "apt-get install", "apt-get search"], correctAnswer: "apt-get update", explanation: "" },
  { id: 2042, text: "Users can update their own passwords. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2043, text: "The root user can change the password of any user. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2044, text: "Which option can be used to view status information about the current user's password?", type: "single", options: ["-i", "-I", "-S", "-s"], correctAnswer: "-S", explanation: "" },
  { id: 2045, text: "When choosing a distribution of Linux, you should consider: (choose four)", type: "multiple", options: ["Does your organization require long-term support for the system", "Does the distribution offer a stable version “ ”", "If the application software is supported by the distribution", "Will commercial support be required for the OS", "Popularity on social media"], correctAnswer: ["Does your organization require long-term support for the system", "Does the distribution offer a stable version “ ”", "If the application software is supported by the distribution", "Will commercial support be required for the OS"], explanation: "" },
  { id: 2046, text: "Embedded Systems means:", type: "single", options: ["Users must support the systems themselves", "You can view the softwares source code", "Companies must share their changes", "Businesses cannot charge a'nything for the software, only the hardware", "Systems designed to do a specific task on hardware optimized for only that purpose"], correctAnswer: "Systems designed to do a specific task on hardware optimized for only that purpose", explanation: "" },
  { id: 2047, text: "The most popular Linux platform for mobile phones is:", type: "single", options: ["IOS", "Android", "BlackBerry", "Slackware", "MobileLinux"], correctAnswer: "Android", explanation: "" },
  { id: 2048, text: "Linux distributions use this to add and remove software from the system:", type: "single", options: ["Application Programming Interface (API)", "Partitioning tool", "Package manager", "Bash", "Compiler"], correctAnswer: "Package manager", explanation: "" },
  { id: 2049, text: "In Linux, RPM can be defined as:", type: "single", options: ["Random program memory", "Relational peak monitoring", "Radical performance machine", "The speed a record plays back at", "The Package Manager program for Red Hat Linux"], correctAnswer: "The Package Manager program for Red Hat Linux", explanation: "" },
  { id: 2050, text: "Linux originally only ran on:", type: "single", options: ["Macintosh", "Intel 386 PCs", "Raspberry Pi computers", "Specialized processor chips", "Xerox copy machines"], correctAnswer: "Intel 386 PCs", explanation: "" },
  { id: 2051, text: "A long software release cycle is:", type: "single", options: ["Better because old hardware can be utilized beyond its service life", "Only offered by Red Hat and SUSE", "Makes programming more difficult since new features cannot be used", "Valued by businesses that want stability", "Characterized by infrequent security fixes"], correctAnswer: "Valued by businesses that want stability", explanation: "" },
  { id: 2052, text: "Which distribution is related to Red Hat?", type: "single", options: ["Raspbian", "Debian", "Ubuntu", "Slackware", "Fedora"], correctAnswer: "Fedora", explanation: "" },
  { id: 2053, text: "SUSE is derived from which distribution?", type: "single", options: ["Fedora", "Debian", "Red Hat Enterprise Linux", "Slackware", "Scientific Linux"], correctAnswer: "Slackware", explanation: "" },
  { id: 2054, text: "IoT is one application of embedded systems: True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2055, text: "Artificial intelligence has little potential for gains in efficiency, safety and productivity.", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2056, text: "The Raspberry Pi is popular with experimenters because:", type: "single", options: ["It runs Microsoft Office", "End users have to pay for programming expenses", "Its cheap and adaptable", "The hardware never changes", "It takes months or years to develop an application"], correctAnswer: "Its cheap and adaptable", explanation: "" },
  { id: 2057, text: "The release cycle:", type: "single", options: ["Only has meaning for paid software", "Should be short so you always have the freshest releases", "Should be long so that you have time before you need to upgrade", "Describes how long software will be supported", "Dictates how often software is updated"], correctAnswer: "Dictates how often software is updated", explanation: "" },
  { id: 2058, text: "Debian is a community effort that supports many hardware platforms True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2059, text: "Linux Mint is:", type: "single", options: ["Compatible with Android systems", "A fork of Ubuntu Linux", "A proprietary version of Ubuntu with advanced features", "A refreshing after dinner treat", "Distributed in every country without license restrictions"], correctAnswer: "A fork of Ubuntu Linux", explanation: "" },
  { id: 2060, text: "A computer running Linux can:", type: "single", options: ["Outperform proprietary systems at certain tasks", "All of the above", "Function as a web server", "Serve a government agency", "Be used to create new programs"], correctAnswer: "All of the above", explanation: "" },
  { id: 2061, text: "Bundling utilities, management tools, and application software with a Linux kernel is called a:", type: "single", options: ["A distribution of Linux", "A text editor", "A type of hardware", "A trademark"], correctAnswer: "A distribution of Linux", explanation: "" },
  { id: 2062, text: "A network of inexpensive computers connected to sensors and controllers is called:", type: "single", options: ["Internet of Things (IoT)", "Creative commons", "Open source networking", "Closed source computing", "Relationational database"], correctAnswer: "Internet of Things (IoT)", explanation: "" },
  { id: 2063, text: "The Linux platform that runs on mobile phones is called:", type: "single", options: ["MicroLinux", "IOS", "Android", "Teledroid", "LinuxMobile"], correctAnswer: "Android", explanation: "" },
  { id: 2064, text: "What does a distribution provide to add and remove software from the system?", type: "single", options: ["Compiler", "Application Programming Interface (API)", "Bash", "Package Manager", "Partitioning tool"], correctAnswer: "Package Manager", explanation: "" },
  { id: 2065, text: "A software release cycle describes:", type: "single", options: ["How often upgrades come out for software", "How often the softwares memory is released back to the operating system", "How often the computer must be upgraded to support new software", "How often security fixes are implemented", "How often the computer must be rebooted"], correctAnswer: "How often upgrades come out for software", explanation: "" },
  { id: 2066, text: "Which distributions are made by, or are clones of, RedHat? (choose two)", type: "multiple", options: ["Debian", "CentOS", "Fedora", "Ubuntu", "Slackware"], correctAnswer: ["CentOS", "Fedora"], explanation: "" },
  { id: 2067, text: "Ubuntu is derived from which distribution?", type: "single", options: ["Slackware", "Debian", "Scientific Linux", "Red Hat Enterprise Linux"], correctAnswer: "Debian", explanation: "" },
  { id: 2068, text: "The most important consideration when choosing an operating system is:", type: "single", options: ["What the intended use of the system is", "How much performance is needed", "The licensing model of the operating system", "The total cost of ownership", "Whether or not it is cloud-friendly"], correctAnswer: "What the intended use of the system is", explanation: "" },
  { id: 2069, text: "A maintenance cycle:", type: "single", options: ["Describes how often updates for software come out", "Should be short so you always have the freshest releases", "Only has meaning for paid software", "Should be long so that you have time before you need to upgrade", "Describes how long a version of software will be supported"], correctAnswer: "Describes how long a version of software will be supported", explanation: "" },
  { id: 2070, text: "If a software release is in a state in that it has many new features that have not been rigorously tested, it is typically referred to as beta software. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2071, text: "Software is backward compatible if:", type: "single", options: ["It can be upgraded without downtime", "People still use old versions", "It still supports old file formats or applications", "If the next version still works the same way", "It works across Linux/Mac/Windows"], correctAnswer: "It still supports old file formats or applications", explanation: "" },
  { id: 2072, text: "Apple's OS X is: (choose three)", type: "multiple", options: ["Derived from Linux", "Able to natively run Windows binaries", "Primarily used to manage network services", "A fully certified UNIX distribution", "Tightly integrated with Apple hardware", "Partially based on code from the FreeBSD project"], correctAnswer: ["A fully certified UNIX distribution", "Tightly integrated with Apple hardware", "Partially based on code from the FreeBSD project"], explanation: "" },
  { id: 2073, text: "Microsoft Windows: (choose three)", type: "multiple", options: ["Has a scripting environment called PowerShell", "Is generally backwards compatible with previous versions", "Offers both desktop and server products", "Has a short maintenance cycle", "Has a Linux compatibility mode", "Has a new desktop version every year."], correctAnswer: ["Has a scripting environment called PowerShell", "Is generally backwards compatible with previous versions", "Offers both desktop and server products"], explanation: "" },
  { id: 2074, text: "When choosing a distribution of Linux, you should consider: (choose five)", type: "multiple", options: ["Does the distribution offer a stable version “ ”", "Will users require a GUI", "Will commercial support be required for the OS", "Does your organization require long-term support for the system", "Popularity on social media", "If the application software is supported by the distribution"], correctAnswer: ["Does the distribution offer a stable version “ ”", "Will users require a GUI", "Will commercial support be required for the OS", "Does your organization require long-term support for the system", "If the application software is supported by the distribution"], explanation: "" },
  { id: 2075, text: "The Samba application is a:", type: "single", options: ["Security Server", "File Server", "Mail Server", "Web Server"], correctAnswer: "File Server", explanation: "" },
  { id: 2076, text: "Which of the following are examples of desktop software? (choose two)", type: "multiple", options: ["Music player", "File share", "Web browser", "Compiler", "Web server"], correctAnswer: ["Music player", "Web browser"], explanation: "" },
  { id: 2077, text: "If you wanted to set up a blog, which software would be most helpful?", type: "single", options: ["Samba", "MySQL", "Postfix", "Dovecot", "WordPress"], correctAnswer: "WordPress", explanation: "" },
  { id: 2078, text: "Which of the following pieces of software deal with file sharing? (choose three)", type: "multiple", options: ["X-Windows", "PostgreSQL", "Netatalk", "Samba", "NFS"], correctAnswer: ["Netatalk", "Samba", "NFS"], explanation: "" },
  { id: 2079, text: "If you wanted to create and print an invoice, which software could you use?", type: "single", options: ["Evolution", "LibreOffice", "GNOME", "Compiz", "Firefox"], correctAnswer: "LibreOffice", explanation: "" },
  { id: 2080, text: "POP and IMAP are related to:", type: "single", options: ["Serving web pages", "Reading and writing music", "Email", "Letting users log in to multiple servers with 1 set of credentials", "Sharing files"], correctAnswer: "Email", explanation: "" },
  { id: 2081, text: "When a computer boots, it can get its network information through:", type: "single", options: ["LDAP", "DNS", "DHCP", "SMTP", "X11"], correctAnswer: "DHCP", explanation: "" },
  { id: 2082, text: "Which of the following are examples of text editors? (choose four)", type: "multiple", options: ["nano", "Yum", "pico", "vim", "emacs"], correctAnswer: ["nano", "pico", "vim", "emacs"], explanation: "" },
  { id: 2083, text: "A package manager: (choose two)", type: "multiple", options: ["Downloads software from the Internet", "Keeps track of which files belong to which packages", "Can optionally repartition your disk to make room for Linux", "Performs a fresh install of Linux", "Emails you when software is out of date"], correctAnswer: ["Downloads software from the Internet", "Keeps track of which files belong to which packages"], explanation: "" },
  { id: 2084, text: "An interpreted programming language: (choose two)", type: "multiple", options: ["Takes fewer resources to run than a compiled language", "Is converted into machine specific instructions as the program runs", "Requires a linking step but no compilation step", "Tends to offer more features than compiled languages", "Requires a compilation step but no linking step"], correctAnswer: ["Is converted into machine specific instructions as the program runs", "Tends to offer more features than compiled languages"], explanation: "" },
  { id: 2085, text: "Which of the following are true about compiled programming languages?", type: "single", options: ["Ruby is a compiled language", "Compiled languages are great for system administration tasks like scripting", "C is a compiled language", "Perl is a compiled language", "A programmer is usually more productive when using a compiled language"], correctAnswer: "C is a compiled language", explanation: "" },
  { id: 2086, text: "Which package manager is used in Fedora, a Red Hat derived system?", type: "single", options: ["tar", "bash", "yum", "vim", "apt-get"], correctAnswer: "yum", explanation: "" },
  { id: 2087, text: "The Linux shell: (choose three)", type: "multiple", options: ["Is customizable", "Has a built-in text editor", "Allows you to launch programs", "Has a scripting language", "Is responsible for tracking the location of configuration files"], correctAnswer: ["Is customizable", "Allows you to launch programs", "Has a scripting language"], explanation: "" },
  { id: 2088, text: "Which application would you use to edit and piece together sound files to make a podcast?", type: "single", options: ["Audiolicious", "GIMP", "Thunderbird", "Bash", "Audacity"], correctAnswer: "Audacity", explanation: "" },
  { id: 2089, text: "The two main families of Linux shells are: (choose two)", type: "multiple", options: ["Emacs", "C Shell", "Bourne Shell", "Python Shell", "Korn shell"], correctAnswer: ["C Shell", "Bourne Shell"], explanation: "" },
  { id: 2090, text: "Which server software would you use to create a company directory that you could search and authenticate against?", type: "single", options: ["bind", "OpenLDAP", "Samba", "ISC DHCP", "Netatalk"], correctAnswer: "OpenLDAP", explanation: "" },
  { id: 2091, text: "A Mail Transfer Agent's primary purpose is to:", type: "single", options: ["Serve email to end clients", "Deliver mail between servers", "Manage the end users inbox", "Filter out spam", "Act as a gateway betw een faxes and email"], correctAnswer: "Deliver mail between servers", explanation: "" },
  { id: 2092, text: "Which of the following are examples of a web server? (choose two)", type: "multiple", options: ["NFS", "postfix", "WordPress", "Nginx", "Apache"], correctAnswer: ["Nginx", "Apache"], explanation: "" },
  { id: 2093, text: "If you wanted to let a Linux machine share files with Windows clients and servers, you would use:", type: "single", options: ["Netatalk", "DNS", "Samba", "NFS", "bind"], correctAnswer: "Samba", explanation: "" },
  { id: 2094, text: "Virtualization means:", type: "single", options: ["A user can connect to a server over the network and use a virtual console", "Many users can share one hard drive", "A machine can swap memory to disk", "A single host can be split up into multiple guests", "Two users get different memory spaces on the same machine"], correctAnswer: "A single host can be split up into multiple guests", explanation: "" },
  { id: 2095, text: "In virtualization, what are the host and guest? (choose two)", type: "multiple", options: ["The terms can be used interchangeably", "A guest is a virtual machine", "A host is a virtual machine", "The host is the machine that runs the virtual machines", "The guest is the machine that runs the virtual machines"], correctAnswer: ["A guest is a virtual machine", "The host is the machine that runs the virtual machines"], explanation: "" },
  { id: 2096, text: "Which of the following are traits of cloud computing? (choose two)", type: "multiple", options: ["You dont have to worry about performance any more", "Resources can be accessed from anywhere over a network", "Scales IT resources so you pay for what you use", "You own the hardware but pay for it over time", "Only Linux works in cloud computing"], correctAnswer: ["Resources can be accessed from anywhere over a network", "Scales IT resources so you pay for what you use"], explanation: "" },
  { id: 2097, text: "If you wanted to write a report that was to be printed, you would probably use:", type: "single", options: ["A wiki", "Adobe Flash", "Firefox", "Chrome", "LibreOffice"], correctAnswer: "LibreOffice", explanation: "" },
  { id: 2098, text: "To protect your privacy online, you can configure your computer to check for updates periodically. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2099, text: "Which of the following is a tool that helps you anonymize your Internet browsing?", type: "single", options: ["Web proxy", "Tor Browser", "Iptables", "AnonFirefox", "CookieCleaner"], correctAnswer: "Tor Browser", explanation: "" },
  { id: 2100, text: "Cloud computing is:", type: "single", options: ["Is made possible by faster internet speeds", "Is useful for both business and home users", "Allows users in different geographical regions to work together in real time", "Requires fewer resources because systems are shared among many users", "All are correct"], correctAnswer: "All are correct", explanation: "" },
  { id: 2101, text: "The term for individual computers running multiple systems at the same time is:", type: "single", options: ["MultiRun", "Cloud priority", "Distribution", "Virtualization", "Googleization"], correctAnswer: "Virtualization", explanation: "" },
  { id: 2102, text: "Which of the following are traits of a multiuser operating system? (choose three)", type: "multiple", options: ["Many users can log in simultaneously with a unique account", "Users can protect their information from other users", "Resources are shared between users", "Each user can only log in once per day", "An administrative user gets a dedicated CPU"], correctAnswer: ["Many users can log in simultaneously with a unique account", "Users can protect their information from other users", "Resources are shared between users"], explanation: "" },
  { id: 2103, text: "If you want to store logins and passwords for different websites in a secure manner, you could use:", type: "single", options: ["A text file in your home directory", "A LibreOffice document", "A sticky note on your monitor", "KeePassX", "In a spiral bound notebook in your file cabinet"], correctAnswer: "KeePassX", explanation: "" },
  { id: 2104, text: "Two components that provide the ability to implement a firewall include: (choose two)", type: "multiple", options: ["iptables", "gufw", "ifconfig", "Cerberus", "ipfw"], correctAnswer: ["iptables", "gufw"], explanation: "" },
  { id: 2105, text: "What are tradeoffs of increasing the level of privacy you have in your web browser? (choose two)", type: "multiple", options: ["You may have to explicitly permit some cookies to be saved", "Sites may not work properly", "You may get viruses", "Websites may load slower", "Images wont load properly"], correctAnswer: ["You may have to explicitly permit some cookies to be saved", "Sites may not work properly"], explanation: "" },
  { id: 2106, text: "Social network “like”(cid:157) buttons can track your  activity across the Internet. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2107, text: "Which of the following are properties of a strong password? (choose three)", type: "multiple", options: ["At least 10 characters long", "Based on easy to remember items like birthdays", "Includes symbols", "Long so that it can be reused on multiple sites", "A mix of upper and lower case"], correctAnswer: ["At least 10 characters long", "Includes symbols", "A mix of upper and lower case"], explanation: "" },
  { id: 2108, text: "What can be done to prevent unauthorized users from accessing your computer remotely? (choose two)", type: "multiple", options: ["Block third party cookies", "Turn on a firewall", "Block all cookies", "Use strong passwords on all user accounts", "Dont use wireless networks only wired"], correctAnswer: ["Turn on a firewall", "Use strong passwords on all user accounts"], explanation: "" },
  { id: 2109, text: "In graphical mode, you can get to a shell by running  – which applications? (choose two)", type: "multiple", options: ["Terminal", "Gbash", "console", "Xterm", "Guiterm"], correctAnswer: ["Terminal", "Xterm"], explanation: "" },
  { id: 2110, text: "Linux source code is available to:", type: "single", options: ["Employees of the FBI, CIA and NSA with top secret clearance", "Anyone who has the knowledge needed to access it", "Only university researchers with a government grant", "Only employees of the Linux Foundation"], correctAnswer: "Anyone who has the knowledge needed to access it", explanation: "" },
  { id: 2111, text: "Source code refers to:", type: "single", options: ["The version of a program that the computer runs on the CPU", "The interface that software uses to talk to the kernel", "The license that dictates how you may use and share the software", "A human-readable version of computer software"], correctAnswer: "A human-readable version of computer software", explanation: "" },
  { id: 2112, text: "Open source means: (choose two)", type: "multiple", options: ["You can view the softwares source code", "You must share your changes", "You can modify the softwares source code", "You cannot charge anything for the software", "You must support the software you share"], correctAnswer: ["You can view the softwares source code", "You can modify the softwares source code"], explanation: "" },
  { id: 2113, text: "A license where you don't have access to the source code is called:", type: "single", options: ["Impaired source", "Closed source", "Open source", "Sourceless"], correctAnswer: "Closed source", explanation: "" },
  { id: 2114, text: "Open source licenses differ, but generally agree that: (choose two)", type: "multiple", options: ["You are not allowed to sell the software", "You must redistribute your changes", "You should be able modify the software as you wish", "You should have access to the source code of software"], correctAnswer: ["You should be able modify the software as you wish", "You should have access to the source code of software"], explanation: "" },
  { id: 2115, text: "Richard Stallman is associated with:", type: "single", options: ["BSD Unix", "Microsoft", "The Free Software Foundation", "The Apache foundation", "The Open Source Initiative"], correctAnswer: "The Free Software Foundation", explanation: "" },
  { id: 2116, text: "A copyleft provision in a software license means:", type: "single", options: ["You may not link against third party closed source software", "If you redistribute the software, you must distribute the source to any changes you make", "You must provide free copies of the software if you use it", "You must provide support for your modifications", "You give up your copyright to the software"], correctAnswer: "If you redistribute the software, you must distribute the source to any changes you make", explanation: "" },
  { id: 2117, text: "The largest difference between the GPLv2 and BSD licenses is:", type: "single", options: ["Nothing, they are virtually identical", "BSD has no copyleft provision", "GPLv2 requires assigning copyright to the FSF", "GPLv2 is not approved by the OSI", "Only BSD allows commercial use"], correctAnswer: "BSD has no copyleft provision", explanation: "" },
  { id: 2118, text: "The Free Software Foundation believes that: (choose two)", type: "multiple", options: ["Software should be free to modify", "Software should be free to share", "Software should not have copyright", "People should write software with no expectation of making money", "No money should ever change hands"], correctAnswer: ["Software should be free to modify", "Software should be free to share"], explanation: "" },
  { id: 2119, text: "Which of the following licenses was made by the FSF?", type: "single", options: ["Creative Commons", "GPLv3", "Apache", "BSD", "MIT"], correctAnswer: "GPLv3", explanation: "" },
  { id: 2120, text: "A permissive free software license: (choose two)", type: "multiple", options: ["Means you can use the software for anything you want", "Does not allow the software to be locked to certain hardware", "Places the software in the public domain", "Places no restrictions on sharing modifications", "Requires you share software changes but not binaries"], correctAnswer: ["Means you can use the software for anything you want", "Places no restrictions on sharing modifications"], explanation: "" },
  { id: 2121, text: "Linux is distributed under which license?", type: "single", options: ["GPLv3", "BSD", "Linux Foundation", "MIT", "GPLv2"], correctAnswer: "GPLv2", explanation: "" },
  { id: 2122, text: "Who founded the Open Source Initiative? (choose two)", type: "multiple", options: ["University of California at Berkeley", "Richard Stallman", "Bruce Perens", "Linus Torvalds", "Eric Raymond"], correctAnswer: ["Richard Stallman", "Eric Raymond"], explanation: "" },
  { id: 2123, text: "A generic term for Open Source and Free Software is:", type: "single", options: ["SLOFF", "OS/FS", "FLOSS", "GPL", "Libre Software"], correctAnswer: "FLOSS", explanation: "" },
  { id: 2124, text: "Which are examples of permissive software licenses? (choose two)", type: "multiple", options: ["BSD", "LGPLv3", "GPLv3", "GPLv2", "MIT"], correctAnswer: ["BSD", "MIT"], explanation: "" },
  { id: 2125, text: "What does it mean when a work is placed in the public domain?", type: "single", options: ["The work was done by a government agency", "You may not use the work for commercial purposes", "The author has died", "The author has relinquished the copyright on the work", "You must redistribute changes to the software"], correctAnswer: "The author has relinquished the copyright on the work", explanation: "" },
  { id: 2126, text: "Creative Commons licenses allow you to: (choose three)", type: "multiple", options: ["Specify whether or not people may distribute changes", "Receive royalties on the use of the work", "Allow or disallow commercial use", "Specify whether or not changes must be shared", "Get a veto on where the work is used"], correctAnswer: ["Specify whether or not people may distribute changes", "Allow or disallow commercial use", "Specify whether or not changes must be shared"], explanation: "" },
  { id: 2127, text: "If a podcast is licensed under the CC BY-ND license, you may: (choose two)", type: "multiple", options: ["Use an interview or song from it for your own podcast", "Post it to your website", "Share it as long as you give credit to the author", "Sell it as part of a compilation", "Add ads to it and post it to your website."], correctAnswer: ["Post it to your website", "Share it as long as you give credit to the author"], explanation: "" },
  { id: 2128, text: "How can you make money from open source software? (choose three)", type: "multiple", options: ["Unlock premium features for people that pay", "Sell hardware thats built to work with the software", "Take payments for fixing bugs", "Charge a yearly fee for the right to use the software", "Provide paid consulting services for users"], correctAnswer: ["Sell hardware thats built to work with the software", "Take payments for fixing bugs", "Provide paid consulting services for users"], explanation: "" },
  { id: 2129, text: "The difference between the GPL and LGPL licenses are:", type: "single", options: ["LGPL applies to web services", "LGPL ensures that all variants of the original GPL program has the same freedom of use as the original", "LGPL allows you to distribute the software in binary-only form", "LGPL is shorter than GPL", "LGPL was made by the OSI while GPL was made by the FSF"], correctAnswer: "LGPL ensures that all variants of the original GPL program has the same freedom of use as the original", explanation: "" },
  { id: 2130, text: "Permissive free software licenses: (choose three)", type: "multiple", options: ["Can allow software to be used inside closed source software", "Include the GPLv2 and BSD", "Are not approved by the FSF", "Dont have a copyleft provision", "Are not approved by the OSI"], correctAnswer: ["Can allow software to be used inside closed source software", "Are not approved by the FSF", "Dont have a copyleft provision"], explanation: "" },
  { id: 2131, text: "The Creative Commons version of Public Domain licensing is:", type: "single", options: ["NoAttribution-ShareAlike (CC BY-SA)", "Attribution-NonCommercial (CC BY-NC)", "Attribution (CC BY)", "No Rights Reserved (CC0)", "Attribution-NonCommercial-ShareAlike (CC BY-NC-SA)"], correctAnswer: "No Rights Reserved (CC0)", explanation: "" },
  { id: 2132, text: "Your company makes a hardware firewall that runs a custom Linux kernel. What are your obligations under GPLv2?", type: "single", options: ["You must ensure your custom kernel runs on a regular Intel machine", "There are no requirements", "You must make the source to your kernel available", "You must make your hardware designs available", "You must make the source to your custom web interface available"], correctAnswer: "You must make the source to your kernel available", explanation: "" },
  { id: 2133, text: "Which environment variable contains a list of directories that is searched for commands to execute?", type: "single", options: ["PATH", "PS1", "PS2", "EXEC"], correctAnswer: "PATH", explanation: "" },
  { id: 2134, text: "Select the command that can report the location of a command:", type: "single", options: ["what", "which", "where"], correctAnswer: "which", explanation: "" },
  { id: 2135, text: "A pair of single quotes ( ‘ ) will prevent the shell from interpreting any metacharacter. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2136, text: "A pair of double quotes (” ) will prevent the shell from interpreting any metacharacter. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2137, text: "Using a pair of back quotes ( ` ) will cause a shell to execute the back-quoted text as a command and substitute the output back into the original command. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2138, text: "The semicolon (;) can be used to separate multiple commands to be executed in order. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2139, text: "The double ampersand characters (&& ) are used to separate commands to be executed conditionally, where if the command to the left of the ampersands fails, then the command to the right of the ampersands will be executed. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2140, text: "To be able to output messages to the screen, use the _______ command:", type: "single", options: ["echo", "print", "display", "type"], correctAnswer: "echo", explanation: "" },
  { id: 2141, text: "The _______ command will print a list of the commands that you've previously executed.", type: "single", options: ["list", "eval", "history", "exec"], correctAnswer: "history", explanation: "" },
  { id: 2142, text: "To execute the same command as previously executed five commands ago, you would type:", type: "single", options: ["@-5", "!5", "!-5", "&5"], correctAnswer: "!-5", explanation: "" },
  { id: 2143, text: "The shell program interprets the commands you type into the terminal into instructions that the Linux operating system can execute. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2144, text: "The acronym CLI stands for:", type: "single", options: ["Computer Line Interface", "Command Line Interpreter", "Command Line Interface", "Computer Link Interpreter"], correctAnswer: "Command Line Interface", explanation: "" },
  { id: 2145, text: "What one character treats the character that follows it as if it was surrounded by single quotes?", type: "single", options: ["/", "#", "%", "\\"], correctAnswer: "\\", explanation: "" },
  { id: 2146, text: "The echo command:", type: "single", options: ["Copies variables from one to another", "Tests a variable for duplication", "Is used for variable assignment", "Is used to output text to the console", "Duplicates the input stream to the output stream"], correctAnswer: "Is used to output text to the console", explanation: "" },
  { id: 2147, text: "The most common shell used for Linux distributions is the ________ shell.", type: "single", options: ["Fish", "Bash", "Tsch", "Zsh"], correctAnswer: "Bash", explanation: "" },
  { id: 2148, text: "HOME is an example of _________.", type: "single", options: ["An environment variable", "A path variable", "A local variable", "An internal command", "An alias"], correctAnswer: "An environment variable", explanation: "" },
  { id: 2149, text: "What is the standard option to provide a command line program to view its documentation?", type: "single", options: ["-h", "info", "– help –", "doc"], correctAnswer: "– help –", explanation: "" },
  { id: 2150, text: "The command man -k is the same as the – command apropos. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2151, text: "The whatis command is the same as man -w.", type: "single", options: ["False", "True"], correctAnswer: "False", explanation: "" },
  { id: 2152, text: "The directory where additional documentation for software packages most likely can be found is:", type: "single", options: ["/usr/software/doc", "/var/lib/doc", "/usr/share/doc", "/var/share/doc"], correctAnswer: "/usr/share/doc", explanation: "" },
  { id: 2153, text: "Which two pager commands are used by the man command to control movement within the document? (choose two)", type: "multiple", options: ["grep", "less", "page", "more"], correctAnswer: ["less", "more"], explanation: "" },
  { id: 2154, text: "Commands typically executed by a user are covered in what section of the manual?", type: "single", options: ["5", "3", "2", "1"], correctAnswer: "1", explanation: "" },
  { id: 2155, text: "To search the man page sections for the keyword example, which of the following command lines could you execute? (choose two)", type: "multiple", options: ["man -k example", "apropos example", "man -f example", "whatis example"], correctAnswer: ["man -k example", "apropos example"], explanation: "" },
  { id: 2156, text: "The statement that describes the difference between a man page and an info page is:", type: "single", options: ["The man page is like a guide; the info page is a more concise reference.", "The info page is like a guide; a man page is a more concise reference.", "The man page is a long detailed reference; the info page is very terse.", "There is very little difference between them."], correctAnswer: "The info page is like a guide; a man page is a more concise reference.", explanation: "" },
  { id: 2157, text: "If you are reading the synopsis of a command from a man page, then items in square brackets are:", type: "single", options: ["Required arguments", "Comments", "Optional", "Required options"], correctAnswer: "Optional", explanation: "" },
  { id: 2158, text: "The following sections commonly appear on a man page: (choose three)", type: "multiple", options: ["NAME", "LICENSE", "DESCRIPTION", "SYNOPSIS"], correctAnswer: ["NAME", "DESCRIPTION", "SYNOPSIS"], explanation: "" },
  { id: 2159, text: "Section 5 of the manual pages covers:", type: "single", options: ["System administration commands", "Games", "User commands", "File Formats"], correctAnswer: "File Formats", explanation: "" },
  { id: 2160, text: "To start searching a man page, the first key you press is:", type: "single", options: ["f", "/", "s", "!"], correctAnswer: "/", explanation: "" },
  { id: 2161, text: "In order to exit viewing a man page, press:", type: "single", options: ["q", "z", "x", "y"], correctAnswer: "q", explanation: "" },
  { id: 2162, text: "To get help on using the info command, execute: (choose two)", type: "multiple", options: ["man info", "info -q", "info info", "help info"], correctAnswer: ["man info", "info info"], explanation: "" },
  { id: 2163, text: "To get help while using the info command, press:", type: "single", options: ["g", "A", "Shift+H", "Shift+z"], correctAnswer: "Shift+H", explanation: "" },
  { id: 2164, text: "To exit the info page, press:", type: "single", options: ["Q", "x", "z", "x"], correctAnswer: "Q", explanation: "" },
  { id: 2165, text: "When interpreting the SYNOPSIS of a command found on a man page, the “|” means:", type: "single", options: ["The items it separates can be used together", "The items it separates cannot be used together"], correctAnswer: "The items it separates cannot be used together", explanation: "" },
  { id: 2166, text: "The _____ command is normally executed daily to update the database of all files that are on the system.", type: "single", options: ["find", "locate", "search", "updatedb"], correctAnswer: "updatedb", explanation: "" },
  { id: 2167, text: "The _____ command is normally executed to search for a command or man page.", type: "single", options: ["updatedb", "whereis", "find", "man -k"], correctAnswer: "whereis", explanation: "" },
  { id: 2168, text: "The _____ command can be used to find any file, not just commands or man pages.", type: "single", options: ["apropos", "whereis", "whatis", "locate"], correctAnswer: "locate", explanation: "" },
  { id: 2169, text: "The info command merges all available documentation into a single “book”. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2170, text: "Section 9 of man pages relates to what?", type: "single", options: ["Library Calls", "Games", "Kernel Routines", "System Calls", "Miscellaneous"], correctAnswer: "Kernel Routines", explanation: "" },
  { id: 2171, text: "The man command searches each of the sections in order until it finds a match. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2172, text: "The whatis command will only return the first result for which section a man page is stored in. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2173, text: "Hidden files are files that begin with what character?", type: "single", options: ["A plus (+)", "An asterisk (*)", "A dash (-)", "A period (.)"], correctAnswer: "A period (.)", explanation: "" },
  { id: 2174, text: "What option for the ls command will display all files, including hidden files?", type: "single", options: ["-a", "-L", "-H", "-w"], correctAnswer: "-a", explanation: "" },
  { id: 2175, text: "The top-level directory on a Linux system is represented as:", type: "single", options: ["/home", "C:", "/root", "/"], correctAnswer: "/", explanation: "" },
  { id: 2176, text: "Is the following path absolute or relative? /etc/ppp", type: "single", options: ["Absolute", "Relative"], correctAnswer: "Absolute", explanation: "" },
  { id: 2177, text: "Is the following path absolute or relative? sysadmin/Documents", type: "single", options: ["Relative", "Absolute"], correctAnswer: "Relative", explanation: "" },
  { id: 2178, text: "Is the following path absolute or relative? ../../home/sysadmin", type: "single", options: ["Absolute", "Relative"], correctAnswer: "Relative", explanation: "" },
  { id: 2179, text: "The tilde (~) is used to represent:", type: "single", options: ["Any two single characters", "Nothing; it has no special meaning", "The directory above the current working directory", "A users home directory"], correctAnswer: "A users home directory", explanation: "" },
  { id: 2180, text: "Which of the following commands can be used to access the home directory of the user bob while logged “ ” in as root? (choose two)", type: "multiple", options: ["cd &&", "cd /home/bob", "cd ~bob", "~bob"], correctAnswer: ["cd /home/bob", "cd ~bob"], explanation: "" },
  { id: 2181, text: "The double dot (..) can be used with the cd command to represent:", type: "single", options: ["A users home directory.", "Any two single characters", "Nothin'g; it has no special meaning.", "The directory above the current working directory"], correctAnswer: "The directory above the current working directory", explanation: "" },
  { id: 2182, text: "The cd command by itself will take you to what directory?", type: "single", options: ["None; it is not a valid command", "The system root directory", "Your home directory", "The directory above the current working directory"], correctAnswer: "Your home directory", explanation: "" },
  { id: 2183, text: "What command will allow you to change your current working directory?", type: "single", options: ["list", "chdir", "ls", "cd"], correctAnswer: "cd", explanation: "" },
  { id: 2184, text: "The double dot (..) can be used to represent the directory…", type: "single", options: ["…below the current directory. …above the current directory.", "current directory only when using the cd command."], correctAnswer: "…below the current directory. …above the current directory.", explanation: "" },
  { id: 2185, text: "T…hwieth l asn y c o tw m o m sin a gl n e d nu w mb it e h rs o . ut options or arguments… …above the", type: "single", options: ["…prompts for a directory to lsi shto.me directory.", "…generates an error as this command requires arguments. …lists the contents of a user the current directory. …lists the contents of"], correctAnswer: "…generates an error as this command requires arguments. …lists the contents of a user the current directory. …lists the contents of", explanation: "" },
  { id: 2186, text: "The first character in a long listing (ls -l) indicates:", type: "single", options: ["The permissions", "The owner", "If something is a file, directory, or symbolic link", "The size"], correctAnswer: "If something is a file, directory, or symbolic link", explanation: "" },
  { id: 2187, text: "Which option for the ls command, when used in conjunction with the -l option, will display human- readable file sizes?", type: "single", options: ["-S", "-H", "-h", "-M"], correctAnswer: "-h", explanation: "" },
  { id: 2188, text: "Which of the following commands will prevent any aliased options to the ls command?", type: "single", options: ["%ls", "/ls", "`ls", "\\ls"], correctAnswer: "\\ls", explanation: "" },
  { id: 2189, text: "The ls command color codes results by default. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2190, text: "The command ls -S will sort files:", type: "single", options: ["By modification date, newest to oldest", "By size, largest to smallest", "By number of symlinks, largest to smallest", "By size, smallest to largest"], correctAnswer: "By size, largest to smallest", explanation: "" },
  { id: 2191, text: "When using the cp command, you must provide both a source and a destination. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2192, text: "Which option(s) can be used to prevent cp from overwriting an existing file? (choose two)", type: "multiple", options: ["-z", "-n", "-N", "-i"], correctAnswer: ["-n", "-i"], explanation: "" },
  { id: 2193, text: "The command rm -r will…", type: "single", options: ["remove a directory along with any files or subdirectories.", "generate an error; -r isnt a valid option.", "remove only empty directories.", "prompt for each confirm'ation before deleting each file in a directory."], correctAnswer: "remove a directory along with any files or subdirectories.", explanation: "" },
  { id: 2194, text: "Which option can be used with the rm command to prompt before deleting?", type: "single", options: ["A", "-P", "l", "-i"], correctAnswer: "-i", explanation: "" },
  { id: 2195, text: "The rm command can delete multiple files at once. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2196, text: "Which of the following commands can be used to rename a file?", type: "single", options: ["cp", "rm", "mv", "name"], correctAnswer: "mv", explanation: "" },
  { id: 2197, text: "The touch command can be used to: (choose two)", type: "multiple", options: ["Update the timestamp of existing files", "Change ownership of a file", "Create new files", "Change a files name"], correctAnswer: ["Update the timestamp of existing files", "Change a files name"], explanation: "" },
  { id: 2198, text: "Which of the following are glob characters? (choose three)", type: "multiple", options: ["The square brackets [ and ] “ ” “ ”", "The question mark ? “ ”", "The dash character -", "“ “ The asterisk * “ ”"], correctAnswer: ["The square brackets [ and ] “ ” “ ”", "The question mark ? “ ”", "“ “ The asterisk * “ ”"], explanation: "" },
  { id: 2199, text: "The main purpose of using glob characters is to be able to provide a list of filenames to a command. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2200, text: "The asterisk character is used to represent zero or more of any character in a filename. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2201, text: "Which of these commands will return /etc/gai.conf /etc/pam.conf /etc/ucf.conf? (choose two)", type: "multiple", options: ["ls /etc/???.????", "echo /etc/???.*f", "echo /etc/*?.*o?", "ls /etc/p???.**"], correctAnswer: ["ls /etc/???.????", "echo /etc/???.*f"], explanation: "" },
  { id: 2202, text: "Brackets cannot be used to a represent a range of characters. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2203, text: "Which command would list files that do not begin with a “T” or a “W”?", type: "single", options: ["echo /etc/*[TW!]", "echo /etc/!TW", "echo /etc/[!TW]*", "echo /etc/[*TW]!"], correctAnswer: "echo /etc/[!TW]*", explanation: "" },
  { id: 2204, text: "Compression of a file works by:", type: "single", options: ["Eliminating gaps within the file", "Consolidating multiple files into one", "Removing redundant information", "Storing most of the data on removable media and just leaving a pointer", "Removing the high order bit from each byte"], correctAnswer: "Removing redundant information", explanation: "" },
  { id: 2205, text: "In general, for which of the following would you want to use lossless compression?", type: "single", options: ["An mp3 audio file", "An encrypted email", "A JPEG image", "A log file", "A movie"], correctAnswer: "A log file", explanation: "" },
  { id: 2206, text: "Lossy compression: (choose three)", type: "multiple", options: ["Usually results better compression than lossless", "Is often used with images", "Is often used with documents", "Decompresses to an identical version as the original", "Sacrifices some quality"], correctAnswer: ["Usually results better compression than lossless", "Is often used with images", "Sacrifices some quality"], explanation: "" },
  { id: 2207, text: "You type gzip myfile.tar. What happens? (choose two)", type: "multiple", options: ["myfile.tar is unarchived into the current directory", "An error; you forgot to pass the name of the output file", "myfile.tar.gz holds a compressed version of myfile.tar", "An error; you forgot to specify the file with -f", "myfile.tar is removed"], correctAnswer: ["myfile.tar.gz holds a compressed version of myfile.tar", "myfile.tar is removed"], explanation: "" },
  { id: 2208, text: "278168 1016950 72.6% tags", type: "single", options: ["gzip l tags –", "gunzip t tags", "file tags"], correctAnswer: "gzip l tags –", explanation: "" },
  { id: 2209, text: "Which– command would you use to archive the Documents directory and compress it with bzip2 compression?", type: "single", options: ["tar fzc Documents documents.tbz", "tar cf Documents documents.tbz", "tar –cjf Documents", "– – tar cjf documents.tbz Documents –", "tar czf documents.tbz"], correctAnswer: "– – tar cjf documents.tbz Documents –", explanation: "" },
  { id: 2210, text: "Which flag would you pass to tar in order to have it – make a new archive?", type: "single", options: ["-t", "-c", "-n", "-x", "-j"], correctAnswer: "-c", explanation: "" },
  { id: 2211, text: "Which command will show what is inside the compressed tarball with a name of foo.tar.gz?", type: "single", options: ["tar tjf foo.tar.gz", "tar lf foo.tar.gz", "tar –tf foo.tar.gz", "tar –xf foo.tar.gz", "– – tar tzf foo.tar.gz –"], correctAnswer: "– – tar tzf foo.tar.gz –", explanation: "" },
  { id: 2212, text: "In the command tar -cvjf foo.tbz a b c, what are a, b, and c?", type: "single", options: ["Nothing; -cvjf only expects one parameter", "File names to be added to the archive", "a is the directory that will be prepended to files; b and c are files inside it", "Matching operators; anything starting with a, b, or c will be added", "Extra flags passed to tar"], correctAnswer: "File names to be added to the archive", explanation: "" },
  { id: 2213, text: "Given the command tar –cvjf homedirs.tbz /home, which of the following are true? (choose two)", type: "multiple", options: ["Only files starting with /home will be extracted from the archive", "The command will print out each filename as it is processed", "The /home directory will be restored with the contents of homedirs.tbz", "Files that are present in the archive might overwrite files in /home", "The output file will be compressed"], correctAnswer: ["The command will print out each filename as it is processed", "The output file will be compressed"], explanation: "" },
  { id: 2214, text: "You archived your users directories into a file called backup.tar.gz. You then view the archive and see the filenames follow this convention: home/username/somefile How will you extract just the files for the user called fred?", type: "single", options: ["tar xzf backup.tar.gz home/fred/ –", "tar tjf backup.tar.gz /home/fred", "tar xjf backup.tar.gz home/fred/", "tar –xzf backup.tar.gz fred", "tar –tzf /home/fred < backup.tar.gz"], correctAnswer: "tar xzf backup.tar.gz home/fred/ –", explanation: "" },
  { id: 2215, text: "Wh–ich of the following commands will create a – zipfile with the contents of your Documents directory?", type: "single", options: ["zip f mydocs.zip Documents", "– zip -r mydocs.zip Documents", "zip c mydocs.zip Documents", "zip mydocs.zip Documents", "zip -–cf mydocs.zip Documents"], correctAnswer: "– zip -r mydocs.zip Documents", explanation: "" },
  { id: 2216, text: "Given a file called documents.zip, how can you see what's in it without extracting the files?", type: "single", options: ["zip -lf documents.zip", "unzip -l documents.zip", "unzip list documents.zip", "zip -l documents.zip", "showz–ip documents.zip"], correctAnswer: "unzip -l documents.zip", explanation: "" },
  { id: 2217, text: "Given a file called documents.zip, how can you extract just the files under ProjectX?", type: "single", options: ["unzip documents.zip ProjectX/*", "unzip documents.zip | grep ProjectX", "unzip documents.zip ProjectX", "zip -x documents.zip ProjectX", "unzip -t documents.zip ProjectX"], correctAnswer: "unzip documents.zip ProjectX/*", explanation: "" },
  { id: 2218, text: "You try to compress a file that is already compressed. Which of the following statements is true?", type: "single", options: ["The file will not be compressed any further than it already was", "The compression algorithm needs to be set to the currently compressed mode for it to be compressed further", "The file changed while you were compressing it “ ”", "The file will be deleted", "The file will actually be uncompressed"], correctAnswer: "The file will not be compressed any further than it already was", explanation: "" },
  { id: 2219, text: "Which of the following commands can be used to compress a file? (choose three)", type: "multiple", options: ["bunzip2", "cat", "zip", "bzip2", "gzip"], correctAnswer: ["zip", "bzip2", "gzip"], explanation: "" },
  { id: 2220, text: "The three main modes of tar are: (choose three)", type: "multiple", options: ["List", "Create", "Compress", "Copy", "Extract"], correctAnswer: ["List", "Create", "Extract"], explanation: "" },
  { id: 2221, text: "In the command tar -czf foo.tar.gz bar, what is the purpose of the f flag?", type: "single", options: ["Tells tar to copy only files, and not directories", "Tells tar to read from the file that follows the flag", "Tells tar to write to the file that follows the flag", "Tells tar to print the name of each file as it is processed", "Specifies extra compression is to be used"], correctAnswer: "Tells tar to write to the file that follows the flag", explanation: "" },
  { id: 2222, text: "Which two commands do the same thing? (choose two)", type: "multiple", options: ["tar -czf foo.tar.gz foo", "tar -tzf foo.tar.gz", "tar -c foo | gzip > foo.tar.gz", "tar -x foo | gzip", "tar -xzf foo.tar.gz"], correctAnswer: ["tar -czf foo.tar.gz foo", "tar -c foo | gzip > foo.tar.gz"], explanation: "" },
  { id: 2223, text: "Which two programs use the Lempel-Ziv-Markov chain algorithm? (choose two)", type: "multiple", options: ["xz", "lossless", "lossy", "bzip", "gzip"], correctAnswer: ["xz", "gzip"], explanation: "" },
  { id: 2224, text: "By default, the zip command replaces uncompressed files with compressed files. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2225, text: "Error messages generated by commands are sent where by default?", type: "single", options: ["STDERR", "STDIN", "Log files", "STDOUT"], correctAnswer: "STDERR", explanation: "" },
  { id: 2226, text: "A successful command may, or may not print output to STDOUT. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2227, text: "Which of the following commands will direct error messages to the file, error.log?", type: "single", options: ["ls /root >> error.log", "ls /root > error.log", "ls /root 2> error.log", "ls /root $> error.log"], correctAnswer: "ls /root 2> error.log", explanation: "" },
  { id: 2228, text: "A pipe allows you to…", type: "single", options: ["prompt.", "…send the same input to multiple commands. …type multiple commands at one …send the output of one command to another."], correctAnswer: "…send the same input to multiple commands. …type multiple commands at one …send the output of one command to another.", explanation: "" },
  { id: 2229, text: "Channel 2 is: …send the output of a command to a file.", type: "single", options: ["STDOUT", "STDALL", "STDERR", "STDIN"], correctAnswer: "STDERR", explanation: "" },
  { id: 2230, text: "Which of the following commands will append its output to output.file?", type: "single", options: ["echo Testing >> output.file", "echo Testing > output.file", "output.file < echo Testing", "echo Testing -> output.file"], correctAnswer: "echo Testing >> output.file", explanation: "" },
  { id: 2231, text: "Which command(s) can be used to sort the lines of list.file alphabetically and display it on the screen? (choose two)", type: "multiple", options: ["sort < list.file", "cat list.file >> sort", "echo list.file > sort", "cat list.file | sort"], correctAnswer: ["sort < list.file", "cat list.file | sort"], explanation: "" },
  { id: 2232, text: "Which option of the head command will display only the first five lines of a file?", type: "single", options: ["No option needed; head displays only five lines by default.", "-n", "-l 5", "-n 5"], correctAnswer: "-n 5", explanation: "" },
  { id: 2233, text: "The grep command…", type: "single", options: ["Expression. …will display all the lines that begin with the specified Regular", "Expression. …will display all the lines in a file containing the specified Regular", "Expression.", "…will display the line n umbers in a file that contain a specified Regular"], correctAnswer: "Expression. …will display all the lines in a file containing the specified Regular", explanation: "" },
  { id: 2234, text: "The grep command can be used with glob characters. …is not case sensitive. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2235, text: "Which of the following commands will display only lines that begin with start?", type: "single", options: ["grep \\start file.txt", "grep $start file.txt", "grep *start file.txt", "grep ^start file.txt"], correctAnswer: "grep ^start file.txt", explanation: "" },
  { id: 2236, text: "Which of the following commands will display only lines that begin with test?", type: "single", options: ["grep $test* file.txt", "grep *test file.txt", "grep &test file.txt", "grep ^test file.txt"], correctAnswer: "grep ^test file.txt", explanation: "" },
  { id: 2237, text: "Which of the following commands will display lines that contain either start or end?", type: "single", options: ["egrep start|end file.txt ‘", "egrep (start|end) file.txt", "egrep start end file.txt", "egrep start&end file.txt"], correctAnswer: "egrep start|end file.txt ‘", explanation: "" },
  { id: 2238, text: "Which of the following commands can be used to scroll through a text file? (choose two)", type: "multiple", options: ["some", "more", "cat", "less"], correctAnswer: ["more", "less"], explanation: "" },
  { id: 2239, text: "Which option for the cut command is used to specify a delimiter?", type: "single", options: ["-D", "-f", "=", "-d"], correctAnswer: "-d", explanation: "" },
  { id: 2240, text: "Which option for the cut command is used to specify the field?", type: "single", options: ["-d", "#", "-D", "-f"], correctAnswer: "-f", explanation: "" },
  { id: 2241, text: "Which option for the wc command will print the number of lines in a file?", type: "single", options: ["-w", "-l", "-L", "-C"], correctAnswer: "-l", explanation: "" },
  { id: 2242, text: "Which option for the wc command will print the total number of words in a file?", type: "single", options: ["-l", "-C", "-L", "-w"], correctAnswer: "-w", explanation: "" },
  { id: 2243, text: "Which command can be used to print line numbers?", type: "single", options: ["num", "nl", "ln", "sort"], correctAnswer: "nl", explanation: "" },
  { id: 2244, text: "The command echo \"text\" > file.txt will create file.txt if it does not already exist. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2245, text: "The command echo \"text\" > file.txt will not overwrite file.txt if it already exists. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2246, text: "The command echo \"text\" >> file.txt will not overwrite file.txt if it already exists. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2247, text: "A file begins with #!/bin/csh. This means:", type: "single", options: ["This is a Perl script", "The operator should not be using /bin/csh", "C Shell compatibility mode is enabled", "Running the script will invoke /bin/csh to interpret the rest of the file", "Nothing, this is a comment"], correctAnswer: "Running the script will invoke /bin/csh to interpret the rest of the file", explanation: "" },
  { id: 2248, text: "Which are appropriate editors for writing shell scripts? (choose two)", type: "multiple", options: ["Firefox", "/bin/bash", "LibreOffice Writer", "vi", "nano"], correctAnswer: ["vi", "nano"], explanation: "" },
  { id: 2249, text: "Most of nano's commands take the form of:", type: "single", options: ["Mouse clicks", "Escape followed by another character", "Control and another character", "The F1 through F12 function keys", "Alt and another character"], correctAnswer: "Control and another character", explanation: "" },
  { id: 2250, text: "mkdir $FOO fi", type: "single", options: ["Creates /tmp/foo if it does not exist", "Outputs a message to the screen", "Creates /tmp/foo and raises an error if there is a problem", "Nothing, since there is a problem with the conditions in the if statement", "Makes the /tmp/foo directory if a file by that name exists"], correctAnswer: "Creates /tmp/foo if it does not exist", explanation: "" },
  { id: 2251, text: "Which of the following are correct about for and while loops? (choose two)", type: "multiple", options: ["for loops have a test each cycle to determine if it should run again", "for loops operate over a fixed list of items", "for loops require a variable over which to iterate", "while loops operate over a fixed list of items", "while loops have a test each cycle to determine if it should run again"], correctAnswer: ["for loops operate over a fixed list of items", "while loops have a test each cycle to determine if it should run again"], explanation: "" },
  { id: 2252, text: "fi What is the meaning of $1?", type: "single", options: ["It is a parameter to -f, indicating the size of the file", "It is the first argument passed to the script", "It is a special variable that indicates the exit code of the command before it", "It is a file called $1", "It is a list of files that gets interpolated"], correctAnswer: "It is the first argument passed to the script", explanation: "" },
  { id: 2253, text: "fi When will “I am here” be printed?", type: "single", options: ["If a file called goodbye exists in the current directory “ ”", "Never", "The script will always print I am here", "If there are two files in the current directory", "If a file called hello exists in“ the curre”nt directory"], correctAnswer: "If a file called goodbye exists in the current directory “ ”", explanation: "" },
  { id: 2254, text: "What is the correct way to assign the word “Hello” “ ” to a variable?", type: "single", options: ["A = Hello", "echo Hello &gt; A", "echo“ $A H”ello", "$A= H“ello ”", "“ ” ” ” A= Hello ” ”"], correctAnswer: "“ ” ” ” A= Hello ” ”", explanation: "" },
  { id: 2255, text: "What is the correct way to save the current directory to a variable?", type: "single", options: ["A=`pwd`", "pwd | $A", "A=cwd", "A=pwd", "pwd $A"], correctAnswer: "A=`pwd`", explanation: "" },
  { id: 2256, text: "Which shell command accepts input from the user's keyboard?", type: "single", options: ["echo", "read", "gets", "input", "$1"], correctAnswer: "read", explanation: "" },
  { id: 2257, text: "What information is held inside $? ?", type: "single", options: ["The name of the command run", "The previous commands exit code", "The number of arguments passed to the script", "The current process id", "The current user ID"], correctAnswer: "The previous commands exit code", explanation: "" },
  { id: 2258, text: "How would you finish your script with an exit code of 42?", type: "single", options: ["return 42", "break 42", "CODE=42", "exit 42", "$?=42"], correctAnswer: "exit 42", explanation: "" },
  { id: 2259, text: "The if command looks for what exit code to consider a condition to be true?", type: "single", options: ["1", "0", "2", "10", "255"], correctAnswer: "0", explanation: "" },
  { id: 2260, text: "The number of users logged in is in a variable called USERS. How would you test to see if 5 users are logged in?", type: "single", options: ["test $USERS eq 5 –", "test f USERS=5", "test $USERS = 5", "test $–USERS,5", "test $USERS a 5"], correctAnswer: "test $USERS eq 5 –", explanation: "" },
  { id: 2261, text: "done Which of the following are true? (choose two)", type: "multiple", options: ["The screen will fill with dots.", "If a file called /tmp/foo exists, process_data wont be run", "process_data will be called at most once", "process_data will never be run", "/tmp/foo will be removed if it exists"], correctAnswer: ["If a file called /tmp/foo exists, process_data wont be run", "process_data will be called at most once"], explanation: "" },
  { id: 2262, text: "A conditional that lets you make multiple comparisons with a pattern is called:", type: "single", options: ["fanout", "case", "if", "branch", "test"], correctAnswer: "case", explanation: "" },
  { id: 2263, text: "What is the meaning of $(( $i + 1)) ?", type: "single", options: ["1 will be added to the i variable", "If i is 0, the loop will stop", "This will return the value of the next argument to the script", "This will return the value of the first argument to the script", "This runs the command stored in variable i"], correctAnswer: "1 will be added to the i variable", explanation: "" },
  { id: 2264, text: "How would you write a test that says “if /tmp/foo is a directory or USERS is greater than 5”?", type: "single", options: ["test d /tmp/foo o $USERS gt 5 – – –", "test d /tmp/foo | $USERS > 5", "test /tmp/foo || $USERS > 5", "test /–tmp/foo d o $USERS -gt 5"], correctAnswer: "test d /tmp/foo o $USERS gt 5 – – –", explanation: "" },
  { id: 2265, text: "Which of the following are valid CPU types for Intel- – – based platforms? (choose two)", type: "multiple", options: ["64-bit", "32-bit", "48-bit", "24-bit"], correctAnswer: ["64-bit", "32-bit"], explanation: "" },
  { id: 2266, text: "64 bit platforms can access more memory than 32 bit platforms. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2267, text: "Choose all of the following statements that are true in regard to virtual RAM: (choose three)", type: "multiple", options: ["Virtual RAM is stored on a hard drive", "Virtual RAM is stored in the CPU", "Virtual RAM is used when available physical RAM is low.", "Virtual RAM is also called swap space"], correctAnswer: ["Virtual RAM is stored on a hard drive", "Virtual RAM is used when available physical RAM is low.", "Virtual RAM is also called swap space"], explanation: "" },
  { id: 2268, text: "Which of the following are common busing systems? (choose two)", type: "multiple", options: ["CPU", "BIOS", "USB", "RAM", "PCI"], correctAnswer: ["USB", "PCI"], explanation: "" },
  { id: 2269, text: "A division of a hard drive may be referred to as a _______ .", type: "single", options: ["block", "partition", "portion", "label"], correctAnswer: "partition", explanation: "" },
  { id: 2270, text: "Which of the following are valid partitioning types? (choose two)", type: "multiple", options: ["GPT", "PC", "MBR", "BIOS"], correctAnswer: ["GPT", "BIOS"], explanation: "" },
  { id: 2271, text: "The fdisk command is a tool used for working with the MBR partitioned disks. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2272, text: "Which of the following is the valid device file name for the first IDE hard drive on the system?", type: "single", options: ["/dev/ide", "/dev/hda", "/dev/sda", "/dev/hd1"], correctAnswer: "/dev/hda", explanation: "" },
  { id: 2273, text: "Which of the following are valid video cable connector types? (choose two)", type: "multiple", options: ["HDA", "VGA", "AMD", "DVI"], correctAnswer: ["VGA", "DVI"], explanation: "" },
  { id: 2274, text: "Which of the following commands will display CPU information? (choose two)", type: "multiple", options: ["lscpu", "cpuinfo", "lspic", "arch", "showcpu"], correctAnswer: ["lscpu", "arch"], explanation: "" },
  { id: 2275, text: "What are the advantages of solid state disks when compared to traditional spinning platter hard disks? (choose two)", type: "multiple", options: ["Less heat", "Faster system boot times", "Higher capacity", "Low cost", "Low power consumption"], correctAnswer: ["Faster system boot times", "Low power consumption"], explanation: "" },
  { id: 2276, text: "Software that allows hardware devices to communicate with the installed operating system is called?", type: "single", options: ["Instructions", "Drivers", "Packages", "Programs"], correctAnswer: "Drivers", explanation: "" },
  { id: 2277, text: "Which of the following commands will check hard disk MBR partitions? (choose three)", type: "multiple", options: ["fdisk", "gfdisk", "gdisk", "cfdisk", "sfdisk"], correctAnswer: ["fdisk", "cfdisk", "sfdisk"], explanation: "" },
  { id: 2278, text: "Which of the following commands will check hard disk GPT partitions? (choose three)", type: "multiple", options: ["gdisk", "sgdisk", "sfdisk", "gfdisk", "cgdisk"], correctAnswer: ["gdisk", "sgdisk", "cgdisk"], explanation: "" },
  { id: 2279, text: "When you execute the dmesg command, the system displays messages that are generated by the kernel. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2280, text: "The Linux kernel mounts the following pseudo- filesystems to provide access to information about hardware devices connected to the system: (choose two)", type: "multiple", options: ["/devices", "/proc", "/info", "/sys"], correctAnswer: ["/proc", "/sys"], explanation: "" },
  { id: 2281, text: "The /proc directory contains a subdirectory for each process present on the system. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2282, text: "The Process ID (PID) of the init process is:", type: "single", options: ["0", "1", "100", "varies"], correctAnswer: "1", explanation: "" },
  { id: 2283, text: "The process (ps) command shows only processes running in the current shell by default. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2284, text: "The following system load averages are displayed by the top command: (choose three)", type: "multiple", options: ["15 minute", "1 minute", "10 minute", "5 minute"], correctAnswer: ["15 minute", "1 minute", "5 minute"], explanation: "" },
  { id: 2285, text: "The free command outputs statistics about:", type: "single", options: ["CPU usage", "Software usage", "Memory usage", "Disk usage"], correctAnswer: "Memory usage", explanation: "" },
  { id: 2286, text: "What directory typically contains log files?", type: "single", options: ["/proc/loc", "/log", "/usr/log", "/var/log"], correctAnswer: "/var/log", explanation: "" },
  { id: 2287, text: "Which log file contains messages regarding authentication and authorization?", type: "single", options: ["secure", "dmesg", "syslog", "messages"], correctAnswer: "secure", explanation: "" },
  { id: 2288, text: "All log files contain only text data. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2289, text: "A load average of 1.0 always means the system is fully loaded. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2290, text: "A command that will continuously update statistics about running processes:", type: "single", options: ["tail", "head", "top", "Bottom"], correctAnswer: "top", explanation: "" },
  { id: 2291, text: "Which of the following is a valid Linux option style for Traditional Unix:", type: "single", options: ["two dashes ( )", "slash (/)", "no dash –", "a single dash (-)"], correctAnswer: "a single dash (-)", explanation: "" },
  { id: 2292, text: "Which file contains the information passed to the kernel at boot time?", type: "single", options: ["/proc/kargs", "/proc/kopts", "/proc/cmdline", "/proc/kernel"], correctAnswer: "/proc/cmdline", explanation: "" },
  { id: 2293, text: "To make changes permanent for kernel parameter files found under /proc/sys, the following file can have entries added to it:", type: "single", options: ["/etc/sysinfo.conf", "/etc/procctl.conf", "/etc/sysctl.conf", "/etc/procsys.conf"], correctAnswer: "/etc/sysctl.conf", explanation: "" },
  { id: 2294, text: "The /var directory has files that change over time. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2295, text: "Information about the init process can be found in the /proc/1 directory. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2296, text: "Which of the following commands will allow you to view all processes on the system? (choose two)", type: "multiple", options: ["ps -ef", "ps", "ps -A", "ps aux", "ps -eLf"], correctAnswer: ["ps -ef", "ps aux"], explanation: "" },
  { id: 2297, text: "The logging daemon on recent Linux distributions based on systemd is called:", type: "single", options: ["klogd", "journald", "rsyslogd", "syslogd"], correctAnswer: "journald", explanation: "" },
  { id: 2298, text: "What does the acronym FHS stand for among the the standards supported by the Linux Foundation?", type: "single", options: ["Filesystem Hierarchy Standard", "File Hierarchy Standard", "Filesystem Hierarchy Structure"], correctAnswer: "Filesystem Hierarchy Standard", explanation: "" },
  { id: 2299, text: "Which directory is the root of the filesystem?", type: "single", options: ["/sys", "/root", "/", "/home", "/var"], correctAnswer: "/", explanation: "" },
  { id: 2300, text: "The sbin directories are primarily intended to be used by the root user. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2301, text: "Which of the following would be considered a host?", type: "single", options: ["A printer attached to the network via an IP address", "A network cable", "A CD-ROM", "The computers hard drive"], correctAnswer: "A printer attached to the network via an IP address", explanation: "" },
  { id: 2302, text: "A service is…", type: "single", options: ["…like an IP address. s hostname.", "…a file that contains configuration information. …another name for a computer …a feature provided by one computer to another."], correctAnswer: "…a file that contains configuration information. …another name for a computer …a feature provided by one computer to another.", explanation: "" },
  { id: 2303, text: "A network packet contains … (choose two)", type: "multiple", options: ["…the IP address of the source machine.", "…a hard drive partition. …the name of the router. …the IP address of the destination machine."], correctAnswer: ["…the IP address of the source machine.", "…a hard drive partition. …the name of the router. …the IP address of the destination machine."], explanation: "" },
  { id: 2304, text: "Only servers have hostnames. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2305, text: "Which of the following protocols defines how network communication functions?", type: "single", options: ["DHCP", "DNS", "TCP/IP", "SSH"], correctAnswer: "TCP/IP", explanation: "" },
  { id: 2306, text: "Which of the following are valid IPv4 addresses? (choose two)", type: "multiple", options: ["192.105.10.10.2", "192.301.25.25", "10.33.55.77", "192.105.10.10"], correctAnswer: ["10.33.55.77", "192.105.10.10"], explanation: "" },
  { id: 2307, text: "Which of the following commands will display the IP address on a Linux system?", type: "single", options: ["ifconfig", "dig", "route", "ipconfig"], correctAnswer: "ifconfig", explanation: "" },
  { id: 2308, text: "Which of the following commands will display the routing table? (choose two)", type: "multiple", options: ["dig", "netstat -r", "ifconfig", "route"], correctAnswer: ["netstat -r", "route"], explanation: "" },
  { id: 2309, text: "Which of the following commands will allow you to log into a remote machine?", type: "single", options: ["dig", "netstat", "route", "ssh"], correctAnswer: "ssh", explanation: "" },
  { id: 2310, text: "What option to the netstat command has information shown as numbers rather than names?", type: "single", options: ["name", "-r", "–-t", "-n"], correctAnswer: "-n", explanation: "" },
  { id: 2311, text: "Which of the following commands will allow you to log into the machine server1 with the account name nick?", type: "single", options: ["ssh nick&server1", "ssh nick-server1", "ssh nick@server1", "ssh nick->server1"], correctAnswer: "ssh nick@server1", explanation: "" },
  { id: 2312, text: "The RSA key fingerprint allows the dig command to connect to remote systems. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2313, text: "When looking at the primary IPv4 configuration file, if the device was configured to be a DHCP client, then the BOOTPROTO value would be set to none. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2314, text: "When issuing the service network restart command, which of the following occurs?", type: "single", options: ["-reads all related configuration files and then the networking for the system is restarted.", "…brin ngest uwpo arklli nnge tfworo rthke i nstyesrtfeamce iss, srteopped and then started back up.", "…the -reads all related configuration files and then the networking for the system is restarted. …takes down all network interfaces, re"], correctAnswer: "…the -reads all related configuration files and then the networking for the system is restarted. …takes down all network interfaces, re", explanation: "" },
  { id: 2315, text: "Which of the following files contains the IP addresses of the name servers the system should consult in any attempt to resolve names to IP addresses?", type: "single", options: ["/etc/nsswitch.conf", "/etc/resolve.conf", "/etc/hosts", "/etc/resolv.conf"], correctAnswer: "/etc/resolv.conf", explanation: "" },
  { id: 2316, text: "Which of the following commands can be used to display socket statistics, and supports all major packet and socket types?", type: "single", options: ["ss", "ifconfig", "route", "top"], correctAnswer: "ss", explanation: "" },
  { id: 2317, text: "Which files contain user account information? (choose two)", type: "multiple", options: ["/etc/shadow", "/etc/group", "/etc/passwords", "/etc/passwd"], correctAnswer: ["/etc/shadow", "/etc/passwd"], explanation: "" },
  { id: 2318, text: "Which user can view the /etc/shadow file?", type: "single", options: ["Any member of the password group", "No users", "The root user", "All users"], correctAnswer: "The root user", explanation: "" },
  { id: 2319, text: "Which command will display the UID, GID and groups your current user belongs to?", type: "single", options: ["whoami", "Who", "id", "about"], correctAnswer: "id", explanation: "" },
  { id: 2320, text: "Each user belongs to at least one group. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2321, text: "Which command will display the users that are currently logged in to the system?", type: "single", options: ["about", "who", "id", "whoami"], correctAnswer: "who", explanation: "" },
  { id: 2322, text: "The sudo command allows regular users to…", type: "single", options: ["…execute commands as another user.", "…execute any command as root, aaftcecro purnot vwiditihnog utht elo rgogoint gp ains.s word."], correctAnswer: "…execute commands as another user.", explanation: "" },
  { id: 2323, text: "W…ruhni canhy ocofm tmhaen df oasl lrooowt, ianftger cproomvidminag nthde ssu wdoi plla sdswisoprdla. y the …run any commands as a system group(s) a user belongs to?", type: "single", options: ["all", "id", "whoami", "group"], correctAnswer: "id", explanation: "" },
  { id: 2324, text: "Which of the following commands will display the groups that the user bob belongs to?", type: "single", options: ["group bob", "id bob", "groups -a", "all bob"], correctAnswer: "id bob", explanation: "" },
  { id: 2325, text: "The /etc/group file follows what structure?", type: "single", options: ["group:GID:user_list", "groups -a", "user:group", "group_name:password_placehoder:GID:user_list"], correctAnswer: "group_name:password_placehoder:GID:user_list", explanation: "" },
  { id: 2326, text: "A GID is associated with a group name. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2327, text: "A user can belong to…", type: "single", options: ["At least 16 groups", "Only five groups", "Only groups with a GID over 500", "Only one group"], correctAnswer: "At least 16 groups", explanation: "" },
  { id: 2328, text: "Sudo privileges can be used to specify which user can use the sudo command to execute commands as other users. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2329, text: "In distributions that do not allow the root user to login directly or via the su command, the installation process automatically configures one user account to be able to use the sudo command to execute commands as if they were executed by the root user. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2330, text: "Which of the following commands will display how long the system has been running since the last boot? (choose two)", type: "multiple", options: ["who", "id", "uptime", "w"], correctAnswer: ["uptime", "w"], explanation: "" },
  { id: 2331, text: "The /etc/shadow file contains plain-text passwords. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2332, text: "Which command can be used to view the /etc/passwd file entries?", type: "single", options: ["uptime", "uppasswd", "getpasswd", "getent"], correctAnswer: "getent", explanation: "" },
  { id: 2333, text: "All Linux systems allow administrators to log in as root. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2334, text: "What is the default user for the su command?", type: "single", options: ["All users", "The root user", "Any member of the password group", "The most recently created user"], correctAnswer: "The root user", explanation: "" },
  { id: 2335, text: "Which command would allow a user to execute commands as root?", type: "single", options: ["whoami", "about", "sudo", "who", "grep"], correctAnswer: "sudo", explanation: "" },
  { id: 2336, text: "File permissions cannot be edited by the root user. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2337, text: "Which command is used to display only the user's primary group?", type: "single", options: ["who", "id -g", "man", "whoami", "about"], correctAnswer: "id -g", explanation: "" },
  { id: 2338, text: "Traditional UNIX systems allowed users to belong to how many groups?", type: "single", options: ["10,000", "1", "65,000", "256", "16"], correctAnswer: "16", explanation: "" },
  { id: 2339, text: "What would an account with the UID 376 typically be used for?", type: "single", options: ["White hat hackers.", "Temporary employees.", "New users with full privileges.", "System service access.", "Root user access."], correctAnswer: "System service access.", explanation: "" },
  { id: 2340, text: "Usernames cannot be the same as group names. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2341, text: "To display the group(s) a user belongs to use this command:", type: "single", options: ["all", "id", "grep", "group", "whoami"], correctAnswer: "id", explanation: "" },
  { id: 2342, text: "Which command will display the groups that the root user belongs to?", type: "single", options: ["all -t", "groups -a", "id root", "all", "group -r"], correctAnswer: "id root", explanation: "" },
  { id: 2343, text: "A value of 0 in the “minimum” password aging field means the user cannot change their password. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2344, text: "True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2345, text: "The last command displays reboot records…", type: "single", options: ["By default", "Never", "Only when issued by the root user", "After restarting the system", "When issued with the -p switch"], correctAnswer: "By default", explanation: "" },
  { id: 2346, text: "Sudo privileges allow users to execute commands as another user. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2347, text: "When using the sudo command to execute a command as the root user, the command prompts for the user's own password, not that of the root user. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2348, text: "The first line of this command displays how long the system has been running since being rebooted.", type: "single", options: ["su", "getent", "w", "id", "who"], correctAnswer: "w", explanation: "" },
  { id: 2349, text: "The /etc/shadow file contains encrypted passwords. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2350, text: "Which command can be used to view the /var/log/wtmp file entries?", type: "single", options: ["getent", "uptime", "getpasswd", "uppasswd", "last"], correctAnswer: "last", explanation: "" },
  { id: 2351, text: "UIDs 1-499 are usually reserved for what kind of users?", type: "single", options: ["Remote log-in accounts", "Are not used for user accounts, but for group accounts", "System accounts, such as server processes", "Log-in (human) users"], correctAnswer: "System accounts, such as server processes", explanation: "" },
  { id: 2352, text: "If a user is deleted, the files and directories that the user owned…", type: "single", options: ["…will have no user owner. …will have no UID owner. …will show a UID as the owner, but not user name."], correctAnswer: "…will have no user owner. …will have no UID owner. …will show a UID as the owner, but not user name.", explanation: "" },
  { id: 2353, text: "Which of the following options for …are deleted as well. the useradd command allows root to specify the UID to be associated with the account?", type: "single", options: ["-g", "-G", "-u", "-M"], correctAnswer: "-u", explanation: "" },
  { id: 2354, text: "Which of the following options for the useradd command allows root to specify supplementary groups the user will be a member of?", type: "single", options: ["-G", "-u", "-g", "-U"], correctAnswer: "-G", explanation: "" },
  { id: 2355, text: "On a system that does not use UPG, the useradd command will also create a user group. For example, user bob, group bob. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2356, text: "Which of the following commands will add the group extra to the user bob‘s secondary groups in addition to bob‘s current secondary groups?", type: "single", options: ["usermod -G extra bob", "usermod -ag bob extra", "usermod -aG extra bob", "usermod -a extra bob"], correctAnswer: "usermod -aG extra bob", explanation: "" },
  { id: 2357, text: "Which option for the usermod command can be used to specify a user's group ID (either primary or secondary)? (choose two)", type: "multiple", options: ["-s", "-g", "-S", "-G"], correctAnswer: ["-g", "-G"], explanation: "" },
  { id: 2358, text: "For non-root users, the passwd command can only be used to change the password of the user running the command. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2359, text: "The groupmod command can be used to change a group name. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2360, text: "The groupmod command can be used to change a group GID. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2361, text: "The groupmod command can be used to add users to a group. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2362, text: "Which of the following commands can be used to modify a group?", type: "single", options: ["groupmod", "groupadd", "modgroup", "addgroup"], correctAnswer: "groupmod", explanation: "" },
  { id: 2363, text: "Which command can be used to determine a user's most recent log in?", type: "single", options: ["history", "last", "login", "shell"], correctAnswer: "last", explanation: "" },
  { id: 2364, text: "Which of the following files contains encrypted user password information?", type: "single", options: ["/etc/usr", "/etc/group", "/etc/passwd", "/etc/shadow"], correctAnswer: "/etc/shadow", explanation: "" },
  { id: 2365, text: "Which of the following files contains user IDs?", type: "single", options: ["/etc/group", "/etc/passwd", "/etc/usr", "/etc/shadow"], correctAnswer: "/etc/passwd", explanation: "" },
  { id: 2366, text: "Which of the following files does the groupadd command use to determine the new GID when a GID isn't specified?", type: "single", options: ["/etc/usr", "/etc/shadow", "/etc/passwd", "/etc/group"], correctAnswer: "/etc/group", explanation: "" },
  { id: 2367, text: "Which of the following commands, run as root, will prevent the user bob from logging in?", type: "single", options: ["usermod -L bob", "usermod -l bob", "usermod -D bob", "usermod -d bob"], correctAnswer: "usermod -L bob", explanation: "" },
  { id: 2368, text: "What directory contains a user's home directory?", type: "single", options: ["/user", "/", "/home", "/rootfs"], correctAnswer: "/home", explanation: "" },
  { id: 2369, text: "GIDs under 500 (or 1000) are usually reserved for what kind of groups?", type: "single", options: ["System use", "Are not used for groups, but for user accounts", "Administrators", "User private groups (UPG)"], correctAnswer: "System use", explanation: "" },
  { id: 2370, text: "If a user is deleted, the files and directories that the user owned…", type: "single", options: ["…are deleted as well. …will have no user owner. …may be important for others in the organization", "UID owner."], correctAnswer: "…are deleted as well. …will have no user owner. …may be important for others in the organization", explanation: "" },
  { id: 2371, text: "Which of the following options for …will have no the useradd command allows you to use a different primary group then the default?", type: "single", options: ["-g", "-G", "-U", "-u"], correctAnswer: "-g", explanation: "" },
  { id: 2372, text: "On a system that uses UPG, the UID must not be the same as the GID.. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2373, text: "The usermod command can be used to unlock a users account with the following option.", type: "single", options: ["-s", "-u", "-f", "-U"], correctAnswer: "-U", explanation: "" },
  { id: 2374, text: "Which of the following options for the useradd command allows you to use a different login shell than the default?", type: "single", options: ["-g", "-s", "-u", "-U"], correctAnswer: "-s", explanation: "" },
  { id: 2375, text: "Which of the following commands will add the group extra to the user jane's secondary groups in addition to jane‘s current secondary groups?", type: "single", options: ["usermod -a extra jane", "usermod -ag jane extra", "usermod -aG extra jane", "usermod -G extra jane"], correctAnswer: "usermod -aG extra jane", explanation: "" },
  { id: 2376, text: "Which option for the usermod command can be used to specify a user's primary group ID?", type: "single", options: ["-g", "-S", "-G", "-s"], correctAnswer: "-g", explanation: "" },
  { id: 2377, text: "For root users, the passwd command can only be used to change the password of the user running the command. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2378, text: "The userdel -r command will…", type: "single", options: ["user account, but leave the users files by default.", "…will prompt before deleting each file owned by a user. …delete the  s home directory and mail spool and their contents. …automatically delete a user and the user"], correctAnswer: "…will prompt before deleting each file owned by a user. …delete the  s home directory and mail spool and their contents. …automatically delete a user and the user", explanation: "" },
  { id: 2379, text: "The groupmod command can be used to change a group …automatically delete a user and all the files owned by that user. name. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2380, text: "The groupmod command cannot be used to change a group GID. True or False?", type: "single", options: ["True", "Fasle"], correctAnswer: "Fasle", explanation: "" },
  { id: 2381, text: "The groupdel command can be used to delete primary groups. True or False?", type: "single", options: ["True", "Fasle"], correctAnswer: "Fasle", explanation: "" },
  { id: 2382, text: "Which of the following commands can be used to modify a user?", type: "single", options: ["adduser", "moduser", "useradd", "usermod"], correctAnswer: "usermod", explanation: "" },
  { id: 2383, text: "Which command can be used to determine a user's most recent log in?", type: "single", options: ["history", "shell", "login", "last"], correctAnswer: "last", explanation: "" },
  { id: 2384, text: "The /etc/passwd file contains encrypted user password information. True or False? True or False?", type: "single", options: ["False", "True"], correctAnswer: "False", explanation: "" },
  { id: 2385, text: "Which of the following files contains group IDs?", type: "single", options: ["/etc/passwd", "/etc/usr", "/etc/shadow", "/etc/group"], correctAnswer: "/etc/group", explanation: "" },
  { id: 2386, text: "Which command allows you to view or change some of the default values used by the useradd command?", type: "single", options: ["useradd -D", "useradd -r", "modvalue", "useradd -f"], correctAnswer: "useradd -D", explanation: "" },
  { id: 2387, text: "Which of the following commands, run as root, will prevent the user jane from logging in?", type: "single", options: ["usermod -d jane", "usermod -D jane", "usermod -L jane", "usermod -l jane"], correctAnswer: "usermod -L jane", explanation: "" },
  { id: 2388, text: "Which of the following commands set “other” permissions on file to r-x?", type: "single", options: ["chmod o-r-w file", "chmod o+rx file", "chmod o=rx file", "chmod o=r+x file"], correctAnswer: "chmod o=rx file", explanation: "" },
  { id: 2389, text: "Which of the following commands sets “other” permissions on file to r-x?", type: "single", options: ["chmod 775 file", "chmod 776 file", "chmod 777 file", "chmod 774 file"], correctAnswer: "chmod 775 file", explanation: "" },
  { id: 2390, text: "Only one set (user, group, other) of permission can be changed at once using the symbolic method. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2391, text: "Which of the following are methods for setting permissions using the chmod command? (choose two)", type: "multiple", options: ["letter", "primary", "symbolic", "octal"], correctAnswer: ["symbolic", "octal"], explanation: "" },
  { id: 2392, text: "The chown command can be used to change the owner and group of a file. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2393, text: "The user sysadmin will be able to read a file because they own it. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2394, text: "The user sysadmin will be able to change the permissions of a file because they own it. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2395, text: "Octal notation uses the following values for the permissions granted:", type: "single", options: ["r = 7, w = 5, x = 0", "r = 3, w = 2, x = 1", "r = 4, w = 2, x = 0", "r = 4, w = 2, x = 1"], correctAnswer: "r = 4, w = 2, x = 1", explanation: "" },
  { id: 2396, text: "Which of the following permissions would allow all users to add, view, and delete files in a directory?", type: "single", options: ["750", "775", "666", "777"], correctAnswer: "777", explanation: "" },
  { id: 2397, text: "A user cannot delete a file if they do not own it. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2398, text: "The “execute” permission on a directory allows you to: (choose three)", type: "multiple", options: ["Along with write permission to successfully delete the directory", "Along with read permission to successfully perform ls -l", "Along with write permission to successfully create new files", "Change to that directory or use it as part of a path"], correctAnswer: ["Along with read permission to successfully perform ls -l", "Along with write permission to successfully create new files", "Change to that directory or use it as part of a path"], explanation: "" },
  { id: 2399, text: "The “execute” permission on a file allows you to:", type: "single", options: ["Move the file to a new directory", "Delete the file", "Run the file as a script", "This permission isnt meaningful for text files."], correctAnswer: "Run the file as a script", explanation: "" },
  { id: 2400, text: "The chgrp command can be used on a file by:", type: "single", options: ["A user that belongs  to the files current group", "Only the file owner", "The file owner and root", "Only root"], correctAnswer: "The file owner and root", explanation: "" },
  { id: 2401, text: "The chown command can be used to change the user owner on a file by:", type: "single", options: ["The file owner", "Only root", "The file owner and root", "A user that belongs to the files current group"], correctAnswer: "Only root", explanation: "" },
  { id: 2402, text: "The chmod command can be used on a file by:", type: "single", options: ["Only root", "A user that belongs to the files current group", "The file owner", "The file owner and root"], correctAnswer: "The file owner and root", explanation: "" },
  { id: 2403, text: "The “execute” permission is never set on files by default. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2404, text: "Which of the following chown commands will change the myFile user ownership to the user sam and the group ownership to administrators? (choose two)", type: "multiple", options: ["chown sam administrators myFile", "chown sam.administrators myFile", "chown sam:administrators myFile", "chown sam+administrators myFile"], correctAnswer: ["chown sam.administrators myFile", "chown sam:administrators myFile"], explanation: "" },
  { id: 2405, text: "The chown command permits changing group ownership done by root only. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2406, text: "The user owner of a file will always have the same or higher permissions as “other”. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2407, text: "Which of the following commands will list hidden files as well as their ownership?", type: "single", options: ["ls -la", "ls -l", "ls -a", "ls -z"], correctAnswer: "ls -la", explanation: "" },
  { id: 2408, text: "The /tmp directory is a temporary directory designed as a location where any user can create a temporary file. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2409, text: "The “sticky bit” permission…", type: "single", options: ["…sets the group ownership of any new file created in a directory. t own from a common directory. …prevents others from removing files they don", "overwriting files they dont own in common …dicrhecatnogreies st.h e group ownership of existing files in a directory."], correctAnswer: "…sets the group ownership of any new file created in a directory. t own from a common directory. …prevents others from removing files they don", explanation: "" },
  { id: 2410, text: "W…phreivcehnt so oft htehrse f rfoomllowing commands will set the “sticky bit” on /shared ?", type: "single", options: ["chmod 2777 /shared", "chmod 1777 /shared", "chmod 6777 /shared", "chmod 4777 /shared"], correctAnswer: "chmod 1777 /shared", explanation: "" },
  { id: 2411, text: "The “setuid” permission…", type: "single", options: ["file from being changed.", "…prevents the owner of a …allows files in a directory to be manipulated as by the directory owner. …reports the output of a script to the owner.", "…allows a command to be run as the file owner."], correctAnswer: "…allows a command to be run as the file owner.", explanation: "" },
  { id: 2412, text: "Which of the following commands will set setuid for /usr/bin/program?", type: "single", options: ["chmod 4755 /usr/bin/program", "chmod 2755 /usr/bin/program", "None of the above", "chmod 1755 /usr/bin/program"], correctAnswer: "chmod 4755 /usr/bin/program", explanation: "" },
  { id: 2413, text: "The “setgid” permission… (choose two)", type: "multiple", options: ["…prevents the group owner of a file from being changed. file. …allows a command to be run as the group owner of the", "directory. …allows files created in a directory to be owned by the group that owns the"], correctAnswer: ["…prevents the group owner of a file from being changed. file. …allows a command to be run as the group owner of the", "directory. …allows files created in a directory to be owned by the group that owns the"], explanation: "" },
  { id: 2414, text: "Which of the following commands will set setgid …can only be set on files. on /shared ?", type: "single", options: ["None of the above", "chmod 2777 /shared", "chmod 1777 /shared", "chmod 4777 /shared", "chmod 4777 /shared"], correctAnswer: "chmod 2777 /shared", explanation: "" },
  { id: 2415, text: "Which of the following long listings represents setgid set for /shared ?", type: "single", options: ["drwxrwsrwx. 12 root group 4096 Oct 21 13:12 /shared", "drwsrwxrwx. 12 root group 4096 Oct 21 13:12 /shared", "drwxrwxrws. 12 root group 4096 Oct 21 13:12 /shared", "drwSrwxrwx. 12 root group 4096 Oct 21 13:12 /shared"], correctAnswer: "drwxrwsrwx. 12 root group 4096 Oct 21 13:12 /shared", explanation: "" },
  { id: 2416, text: "Setting setgid on a directory…", type: "single", options: ["directory.", "…will allow scripts in the direc tory to be executed as the group owner of the", "…is not allowed by the system. …does nothing. created in the directory to the group owner of the directory. …will set the group owner of all files"], correctAnswer: "…is not allowed by the system. …does nothing. created in the directory to the group owner of the directory. …will set the group owner of all files", explanation: "" },
  { id: 2417, text: "Deleting a source file will break an associated hard link. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2418, text: "A source and a hard link must be part of the same filesystem. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2419, text: "Deleting a source file will break an associated symbolic link. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2420, text: "A source file and a symbolic link must be part of the same file system. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2421, text: "Which of the following commands would create a hard link, link to file?", type: "single", options: ["ln file link", "ln link file", "ln -s file link", "ln -s link file"], correctAnswer: "ln file link", explanation: "" },
  { id: 2422, text: "Which of the following commands would create a symbolic link, link to file?", type: "single", options: ["ln file link", "ln -s link file", "ln link file", "ln -s file link"], correctAnswer: "ln -s file link", explanation: "" },
  { id: 2423, text: "Which of the following ls commands, when executed, will only show information about the directory itself? (choose two)", type: "multiple", options: ["ls -h", "ld -d", "ls -ld", "ld -a"], correctAnswer: ["ld -d", "ls -ld"], explanation: "" },
  { id: 2424, text: "Which of the following directories are designed as locations where any user can create a temporary file? (choose two)", type: "multiple", options: ["/sbin", "/lost+found", "/tmp", "/home", "/var/tmp"], correctAnswer: ["/tmp", "/var/tmp"], explanation: "" },
  { id: 2425, text: "The most popular Linux platform for mobile phones is:", type: "single", options: ["Android", "Slackware", "BlackBerry", "IOS", "MobileLinux"], correctAnswer: "Android", explanation: "" },
  { id: 2426, text: "The release cycle:", type: "single", options: ["Only has meaning for paid software", "Describes how long software will be supported", "Should be long so that you have time before you need to upgrade", "Should be short so you always have the freshest releases", "Dictates how often software is updated"], correctAnswer: "Dictates how often software is updated", explanation: "" },
  { id: 2427, text: "What does a distribution provide to add and remove software from the system?", type: "single", options: ["Package Manager", "Application Programming Interface (API)", "Partitioning tool", "Compiler", "Bash"], correctAnswer: "Package Manager", explanation: "" },
  { id: 2428, text: "A maintenance cycle:", type: "single", options: ["Describes how often updates for software come out", "Should be short so you always have the freshest releases", "Describes how long a version of software will be supported", "Only has meaning for paid software", "Should be long so that you have time before you need to upgrade"], correctAnswer: "Describes how long a version of software will be supported", explanation: "" },
  { id: 2429, text: "When choosing a distribution of Linux, you should consider: (choose five)", type: "multiple", options: ["Popularity on social media", "Does the distribution offer a stable version “ ”", "Does your organization require long-term support for the system", "If the application software is supported by the distribution", "Will users require a GUI", "Will commercial support be required for the OS"], correctAnswer: ["Does the distribution offer a stable version “ ”", "Does your organization require long-term support for the system", "If the application software is supported by the distribution", "Will users require a GUI", "Will commercial support be required for the OS"], explanation: "" },
  { id: 2430, text: "Which of the following are examples of desktop software? (choose two)", type: "multiple", options: ["File share", "Compiler", "Music player", "Web server", "Web browser"], correctAnswer: ["Music player", "Web browser"], explanation: "" },
  { id: 2431, text: "Which of the following pieces of software deal with file sharing? (choose three)", type: "multiple", options: ["Netatalk", "Samba", "X-Windows", "NFS", "PostgreSQL"], correctAnswer: ["Netatalk", "Samba", "NFS"], explanation: "" },
  { id: 2432, text: "The Linux shell: (choose three)", type: "multiple", options: ["Is responsible for tracking the location of configuration files", "Has a scripting language", "Has a built-in text editor", "Is customizable", "Allows you to launch programs"], correctAnswer: ["Has a scripting language", "Is customizable", "Allows you to launch programs"], explanation: "" },
  { id: 2433, text: "Virtualization means:", type: "single", options: ["Many users can share one hard drive", "A user can connect to a server over the network and use a virtual console", "A machine can swap memory to disk", "A single host can be split up into multiple guests", "Two users get different memory spaces on the same machine"], correctAnswer: "A single host can be split up into multiple guests", explanation: "" },
  { id: 2434, text: "In graphical mode, you can get to a shell by running which applications? (choose two)", type: "multiple", options: ["Gbash", "Guiterm", "Terminal", "Xterm", "console"], correctAnswer: ["Terminal", "Xterm"], explanation: "" },
  { id: 2435, text: "Source code refers to:", type: "single", options: ["A human-readable version of computer software", "The interface that software uses to talk to the kernel", "The version of a program that the computer runs on the CPU", "The license that dictates how you may use and share the software"], correctAnswer: "A human-readable version of computer software", explanation: "" },
  { id: 2436, text: "Open source means: (choose two)", type: "multiple", options: ["You can modify the softwares source code", "You must share your changes", "You must support the software you share", "You cannot charge anything for the software", "You can view the softwares source code"], correctAnswer: ["You can modify the softwares source code", "You can view the softwares source code"], explanation: "" },
  { id: 2437, text: "A copyleft provision in a software license means:", type: "single", options: ["You give up your copyright to the software", "You may not link against third party closed source software", "You must provide support for your modifications", "You must provide free copies of the software if you use it", "If you redistribute the software, you must distribute the source to any changes you make"], correctAnswer: "If you redistribute the software, you must distribute the source to any changes you make", explanation: "" },
  { id: 2438, text: "Linux is distributed under which license?", type: "single", options: ["MIT", "GPLv2", "GPLv3", "Linux Foundation", "BSD"], correctAnswer: "GPLv2", explanation: "" },
  { id: 2439, text: "Creative Commons licenses allow you to: (choose three)", type: "multiple", options: ["Receive royalties on the use of the work", "Allow or disallow commercial use", "Specify whether or not people may distribute changes", "Get a veto on where the work is used", "Specify whether or not changes must be shared"], correctAnswer: ["Allow or disallow commercial use", "Specify whether or not people may distribute changes", "Specify whether or not changes must be shared"], explanation: "" },
  { id: 2440, text: "Which environment variable contains a list of directories that is searched for commands to execute?", type: "single", options: ["PS2", "PATH", "EXEC", "PS1"], correctAnswer: "PATH", explanation: "" },
  { id: 2441, text: "Select the command that can report the location of a command:", type: "single", options: ["what", "where", "which"], correctAnswer: "which", explanation: "" },
  { id: 2442, text: "A pair of double quotes (\" ) will prevent the shell from interpreting any metacharacter. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2443, text: "The shell program interprets the commands you type into the terminal into instructions that the Linux operating system can execute. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2444, text: "The acronym CLI stands for:", type: "single", options: ["Command Line Interface", "Computer Link Interpreter", "Command Line Interpreter", "Computer Line Interface"], correctAnswer: "Command Line Interface", explanation: "" },
  { id: 2445, text: "The most common shell used for Linux distributions is the ________ shell.", type: "single", options: ["Zsh", "Fish", "Tsch", "Bash"], correctAnswer: "Bash", explanation: "" },
  { id: 2446, text: "Which two pager commands are used by the man command to control movement within the document? (choose two)", type: "multiple", options: ["more", "page", "grep", "less"], correctAnswer: ["more", "less"], explanation: "" },
  { id: 2447, text: "To search the man page sections for the keyword example, which of the following command lines could you execute? (choose two)", type: "multiple", options: ["man -k example", "apropos example", "man -f example", "whatis example"], correctAnswer: ["man -k example", "apropos example"], explanation: "" },
  { id: 2448, text: "The statement that describes the difference between a man page and an info page is:", type: "single", options: ["The man page is a long detailed reference; the info page is very terse.", "There is very little difference between them.", "The man page is like a guide; the info page is a more concise reference.", "The info page is like a guide; a man page is a more concise reference."], correctAnswer: "The info page is like a guide; a man page is a more concise reference.", explanation: "" },
  { id: 2449, text: "The following sections commonly appear on a man page: (choose three)", type: "multiple", options: ["SYNOPSIS", "NAME", "LICENSE", "DESCRIPTION"], correctAnswer: ["SYNOPSIS", "NAME", "DESCRIPTION"], explanation: "" },
  { id: 2450, text: "The top-level directory on a Linux system is represented as:", type: "single", options: ["/", "/home", "C:", "/root"], correctAnswer: "/", explanation: "" },
  { id: 2451, text: "The tilde (~) is used to represent:", type: "single", options: ["Nothing; it has no special meaning", "Any two single characters", "The directory above the current working directory", "A users home directory"], correctAnswer: "A users home directory", explanation: "" },
  { id: 2452, text: "The cd command by itself will take you to what directory?", type: "single", options: ["The directory above the current working directory", "None; it is not a valid command", "Your home directory", "The system root directory"], correctAnswer: "Your home directory", explanation: "" },
  { id: 2453, text: "What command will allow you to change your current working directory?", type: "single", options: ["ls", "list", "chdir", "cd"], correctAnswer: "cd", explanation: "" },
  { id: 2454, text: "The first character in a long listing (ls -l) indicates:", type: "single", options: ["If something is a file, directory, or symbolic link", "The size", "The permissions", "The owner"], correctAnswer: "If something is a file, directory, or symbolic link", explanation: "" },
  { id: 2455, text: "Which of the following commands can be used to rename a file?", type: "single", options: ["rm", "cp", "name", "mv"], correctAnswer: "mv", explanation: "" },
  { id: 2456, text: "The touch command can be used to: (choose two)", type: "multiple", options: ["Change ownership of a file", "Create new files", "Change a files name", "Update the timestamp of existing files"], correctAnswer: ["Create new files", "Update the timestamp of existing files"], explanation: "" },
  { id: 2457, text: "Which of the following are glob characters? (choose three)", type: "multiple", options: ["The question mark ? “ ”", "The dash character -", "“ “ The square brackets [ and ] “ ” “ ”", "The asterisk * “ ”"], correctAnswer: ["The question mark ? “ ”", "“ “ The square brackets [ and ] “ ” “ ”", "The asterisk * “ ”"], explanation: "" },
  { id: 2458, text: "The main purpose of using glob characters is to be able to provide a list of filenames to a command. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2459, text: "The asterisk character is used to represent zero or more of any character in a filename. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2460, text: "Compression of a file works by:", type: "single", options: ["Removing the high order bit from each byte", "Eliminating gaps within the file", "Storing most of the data on removable media and just leaving a pointer", "Removing redundant information", "Consolidating multiple files into one"], correctAnswer: "Removing redundant information", explanation: "" },
  { id: 2461, text: "Lossy compression: (choose three)", type: "multiple", options: ["Usually results better compression than lossless", "Is often used with images", "Sacrifices some quality", "Is often used with documents", "Decompresses to an identical version as the original"], correctAnswer: ["Usually results better compression than lossless", "Is often used with images", "Sacrifices some quality"], explanation: "" },
  { id: 2462, text: "Which of the following commands can be used to compress a file? (choose three)", type: "multiple", options: ["zip", "bzip2", "gzip", "bunzip2", "cat"], correctAnswer: ["zip", "bzip2", "gzip"], explanation: "" },
  { id: 2463, text: "The three main modes of tar are: (choose three)", type: "multiple", options: ["Copy", "List", "Compress", "Extract", "Create"], correctAnswer: ["List", "Extract", "Create"], explanation: "" },
  { id: 2464, text: "In the command tar -czf foo.tar.gz bar, what is the purpose of the f flag?", type: "single", options: ["Tells tar to write to the file that follows the flag", "Tells tar to print the name of each file as it is processed", "Tells tar to read from the file that follows the flag", "Specifies extra compression is to be used", "Tells tar to copy only files, and not directories"], correctAnswer: "Tells tar to write to the file that follows the flag", explanation: "" },
  { id: 2465, text: "Which of the following are traits of a multiuser operating system? (choose three)", type: "multiple", options: ["Resources are shared between users", "Users can protect their information from other users", "Many users can log in simultaneously with a unique account", "Each user can only log in once per day", "An administrative user gets a dedicated CPU"], correctAnswer: ["Resources are shared between users", "Users can protect their information from other users", "Many users can log in simultaneously with a unique account"], explanation: "" },
  { id: 2466, text: "A pipe allows you to…", type: "single", options: ["…send the same input to multiple commands.", "…type multiple commands at one prompt. …send the output of one command to another."], correctAnswer: "…type multiple commands at one prompt. …send the output of one command to another.", explanation: "" },
  { id: 2467, text: "Channel 2 is: …send the output of a command to a file.", type: "single", options: ["STDALL", "STDOUT", "STDERR", "STDIN"], correctAnswer: "STDERR", explanation: "" },
  { id: 2468, text: "The grep command…", type: "single", options: ["…will display all the lines that begin with the specified Regular Expression. Expression. …will display all the lines in a file containing the specified Regular", "a specified Regular …Exisp rneosts cioanse. sensitive."], correctAnswer: "…will display all the lines that begin with the specified Regular Expression. Expression. …will display all the lines in a file containing the specified Regular", explanation: "" },
  { id: 2469, text: "W…whilil cdhis polafy tthhee li nfeo nlluomwbeirnsg in ca ofilme tmhaat cnodntsa incan be used to scroll through a text file? (choose two)", type: "multiple", options: ["cat", "less", "some", "more"], correctAnswer: ["less", "more"], explanation: "" },
  { id: 2470, text: "Which command can be used to print line numbers?", type: "single", options: ["ln", "nl", "sort", "num"], correctAnswer: "nl", explanation: "" },
  { id: 2471, text: "Which are appropriate editors for writing shell scripts? (choose two)", type: "multiple", options: ["LibreOffice Writer", "vi", "Firefox", "nano", "/bin/bash"], correctAnswer: ["vi", "nano"], explanation: "" },
  { id: 2472, text: "Which of the following are correct about for and while loops? (choose two)", type: "multiple", options: ["while loops operate over a fixed list of items", "for loops have a test each cycle to determine if it should run again", "while loops have a test each cycle to determine if it should run again", "for loops operate over a fixed list of items", "for loops require a variable over which to iterate"], correctAnswer: ["while loops have a test each cycle to determine if it should run again", "for loops operate over a fixed list of items"], explanation: "" },
  { id: 2473, text: "What is the correct way to assign the word “Hello” to a variable?", type: "single", options: ["$A= Hello", "A = Hello", "echo” Hell”o &gt; A", "“ ” “ ” A= Hello ” ”", "echo $A Hello"], correctAnswer: "“ ” “ ” A= Hello ” ”", explanation: "" },
  { id: 2474, text: "What is the correct way to save the current directory “ ” to a variable?", type: "single", options: ["pwd $A", "A=cwd", "A=`pwd`", "A=pwd", "pwd | $A"], correctAnswer: "A=`pwd`", explanation: "" },
  { id: 2475, text: "What is the meaning of $(( $i + 1)) ?", type: "single", options: ["If i is 0, the loop will stop", "This runs the command stored in variable i", "This will return the value of the next argument to the script", "1 will be added to the i variable", "This will return the value of the first argument to the script"], correctAnswer: "1 will be added to the i variable", explanation: "" },
  { id: 2476, text: "Which of the following are valid CPU types for Intel- based platforms? (choose two)", type: "multiple", options: ["64-bit", "24-bit", "32-bit", "48-bit"], correctAnswer: ["64-bit", "32-bit"], explanation: "" },
  { id: 2477, text: "Choose all of the following statements that are true in regard to virtual RAM: (choose three)", type: "multiple", options: ["Virtual RAM is stored in the CPU", "Virtual RAM is also called swap space", "Virtual RAM is stored on a hard drive", "Virtual RAM is used when available physical RAM is low."], correctAnswer: ["Virtual RAM is also called swap space", "Virtual RAM is stored on a hard drive", "Virtual RAM is used when available physical RAM is low."], explanation: "" },
  { id: 2478, text: "A division of a hard drive may be referred to as a _______ .", type: "single", options: ["label", "block", "portion", "partition"], correctAnswer: "partition", explanation: "" },
  { id: 2479, text: "The fdisk command is a tool used for working with the MBR partitioned disks. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2480, text: "Which of the following commands will display CPU information? (choose two)", type: "multiple", options: ["cpuinfo", "lscpu", "showcpu", "lspic", "arch"], correctAnswer: ["lscpu", "arch"], explanation: "" },
  { id: 2481, text: "The Process ID (PID) of the init process is:", type: "single", options: ["100", "0", "1", "varies"], correctAnswer: "1", explanation: "" },
  { id: 2482, text: "What directory typically contains log files?", type: "single", options: ["/proc/loc", "/usr/log", "/log", "/var/log"], correctAnswer: "/var/log", explanation: "" },
  { id: 2483, text: "The /var directory has files that change over time. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2484, text: "Which of the following commands will allow you to view all processes on the system? (choose two)", type: "multiple", options: ["ps -ef", "ps aux", "ps -eLf", "ps -A", "ps"], correctAnswer: ["ps -ef", "ps aux"], explanation: "" },
  { id: 2485, text: "Which directory is the root of the filesystem?", type: "single", options: ["/sys", "/", "/var", "/home", "/root"], correctAnswer: "/", explanation: "" },
  { id: 2486, text: "A service is…", type: "single", options: ["s hostname.", "…another name for a computer", "…a file that contains configuration information. …like an IP address. …a feature provided by one computer to another."], correctAnswer: "…a file that contains configuration information. …like an IP address. …a feature provided by one computer to another.", explanation: "" },
  { id: 2487, text: "Only servers have hostnames. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2488, text: "Which of the following are valid IPv4 addresses? (choose two)", type: "multiple", options: ["10.33.55.77", "192.105.10.10.2", "192.105.10.10", "192.301.25.25"], correctAnswer: ["10.33.55.77", "192.105.10.10"], explanation: "" },
  { id: 2489, text: "Which of the following commands will allow you to log into a remote machine?", type: "single", options: ["route", "ssh", "dig", "netstat"], correctAnswer: "ssh", explanation: "" },
  { id: 2490, text: "Which files contain user account information? (choose two)", type: "multiple", options: ["/etc/passwd", "/etc/passwords", "/etc/shadow", "/etc/group"], correctAnswer: ["/etc/passwd", "/etc/shadow"], explanation: "" },
  { id: 2491, text: "Which command will display the UID, GID and groups your current user belongs to?", type: "single", options: ["whoami", "Who", "about", "id"], correctAnswer: "id", explanation: "" },
  { id: 2492, text: "Each user belongs to at least one group. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2493, text: "Which command will display the users that are currently logged in to the system?", type: "single", options: ["id", "who", "about", "whoami"], correctAnswer: "who", explanation: "" },
  { id: 2494, text: "Which command will display the groups that the root user belongs to?", type: "single", options: ["all", "all -t", "group -r", "id root", "groups -a"], correctAnswer: "id root", explanation: "" },
  { id: 2495, text: "UIDs 1-499 are usually reserved for what kind of users?", type: "single", options: ["Are not used for user accounts, but for group accounts", "Log-in (human) users", "Remote log-in accounts", "System accounts, such as server processes"], correctAnswer: "System accounts, such as server processes", explanation: "" },
  { id: 2496, text: "Which of the following options for the useradd command allows root to specify the UID to be associated with the account?", type: "single", options: ["-u", "-g", "-M", "-G"], correctAnswer: "-u", explanation: "" },
  { id: 2497, text: "Which command can be used to determine a user's most recent log in?", type: "single", options: ["last", "login", "history", "shell"], correctAnswer: "last", explanation: "" },
  { id: 2498, text: "Which of the following files contains encrypted user password information?", type: "single", options: ["/etc/shadow", "/etc/group", "/etc/usr", "/etc/passwd"], correctAnswer: "/etc/shadow", explanation: "" },
  { id: 2499, text: "Which of the following options for the useradd command allows you to use a different primary group then the default?", type: "single", options: ["-G", "-u", "-U", "-g"], correctAnswer: "-g", explanation: "" },
  { id: 2500, text: "Which of the following commands can be used to modify a user?", type: "single", options: ["adduser", "usermod", "moduser", "useradd"], correctAnswer: "usermod", explanation: "" },
  { id: 2501, text: "Which of the following are methods for setting permissions using the chmod command? (choose two)", type: "multiple", options: ["letter", "primary", "symbolic", "octal"], correctAnswer: ["symbolic", "octal"], explanation: "" },
  { id: 2502, text: "The chown command can be used to change the owner and group of a file. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2503, text: "The chmod command can be used on a file by:", type: "single", options: ["The file owner and root", "The file owner", "Only root", "A user that belongs to the files current group"], correctAnswer: "The file owner and root", explanation: "" },
  { id: 2504, text: "The “execute” permission is never set on files by default. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2505, text: "The “sticky bit” permission…", type: "single", options: ["…changes the group ownership of existing files in a directory. t own from a common directory. …prevents others from removing files they don", "t own in common …disreetcst othriee sg.r oup ownership of any new file created in a directory."], correctAnswer: "…changes the group ownership of existing files in a directory. t own from a common directory. …prevents others from removing files they don", explanation: "" },
  { id: 2506, text: "T…hpreev “ enstes ottuhiedrs ” f r p om e r o m ver is w s ri i t o in n g … file s they don", type: "single", options: ["of a script to the owner.", "…prevents the owner of a file from being changed. …reports the output …allows a command to be run as the file owner."], correctAnswer: "…prevents the owner of a file from being changed. …reports the output …allows a command to be run as the file owner.", explanation: "" },
  { id: 2507, text: "The “setgid” permission… …allows files in a directory to be manipulated as by the directory owner. (choose two)", type: "multiple", options: ["…prevents the group owner of a file from being changed. created in a directory to be owned by the group that owns the directory. …allows files", "…allows a command to be run as the group owner of the file."], correctAnswer: ["…prevents the group owner of a file from being changed. created in a directory to be owned by the group that owns the directory. …allows files", "…allows a command to be run as the group owner of the file."], explanation: "" },
  { id: 2508, text: "Which of the following ls commands, when executed, …can only be set on files. will only show information about the directory itself? (choose two)", type: "multiple", options: ["ls -h", "ld -d", "ld -a", "ls -ld"], correctAnswer: ["ld -d", "ls -ld"], explanation: "" },
  { id: 2509, text: "Embedded Systems means:", type: "single", options: ["Companies must share their changes", "You can view the softwares source code", "Businesses cannot charge anything for the software, only the hardware", "Systems designed to do a specific task on hardware optimized for only that purpose", "Users must support the systems themselves"], correctAnswer: "Systems designed to do a specific task on hardware optimized for only that purpose", explanation: "" },
  { id: 2510, text: "Linux originally only ran on:", type: "single", options: ["Xerox copy machines", "Specialized processor chips", "Intel 386 PCs", "Raspberry Pi computers", "Macintosh"], correctAnswer: "Intel 386 PCs", explanation: "" },
  { id: 2511, text: "Bundling utilities, management tools, and application software with a Linux kernel is called a:", type: "single", options: ["A trademark", "A distribution of Linux", "A type of hardware", "A text editor"], correctAnswer: "A distribution of Linux", explanation: "" },
  { id: 2512, text: "A software release cycle describes:", type: "single", options: ["How often security fixes are implemented", "How often the softwares memory is released back to the operating system", "How often upgrades come out for software", "How often the computer must be rebooted", "How often the computer must be upgraded to support new software"], correctAnswer: "How often upgrades come out for software", explanation: "" },
  { id: 2513, text: "Apple's OS X is: (choose three)", type: "multiple", options: ["A fully certified UNIX distribution", "Tightly integrated with Apple hardware", "Partially based on code from the FreeBSD project", "Primarily used to manage network services", "Derived from Linux", "Able to natively run Windows binaries"], correctAnswer: ["A fully certified UNIX distribution", "Tightly integrated with Apple hardware", "Partially based on code from the FreeBSD project"], explanation: "" },
  { id: 2514, text: "Microsoft Windows: (choose three)", type: "multiple", options: ["Is generally backwards compatible with previous versions", "Offers both desktop and server products", "Has a Linux compatibility mode", "Has a short maintenance cycle", "Has a scripting environment called PowerShell", "Has a new desktop version every year."], correctAnswer: ["Is generally backwards compatible with previous versions", "Offers both desktop and server products", "Has a scripting environment called PowerShell"], explanation: "" },
  { id: 2515, text: "An interpreted programming language: (choose two)", type: "multiple", options: ["Requires a compilation step but no linking step", "Is converted into machine specific instructions as the program runs", "Tends to offer more features than compiled languages", "Requires a linking step but no compilation step", "Takes fewer resources to run than a compiled language"], correctAnswer: ["Is converted into machine specific instructions as the program runs", "Tends to offer more features than compiled languages"], explanation: "" },
  { id: 2516, text: "The two main families of Linux shells are: (choose two)", type: "multiple", options: ["Bourne Shell", "Python Shell", "Korn shell", "Emacs", "C Shell"], correctAnswer: ["Bourne Shell", "C Shell"], explanation: "" },
  { id: 2517, text: "In virtualization, what are the host and guest? (choose two)", type: "multiple", options: ["The host is the machine that runs the virtual machines", "The guest is the machine that runs the virtual machines", "The terms can be used interchangeably", "A host is a virtual machine", "A guest is a virtual machine"], correctAnswer: ["The host is the machine that runs the virtual machines", "A guest is a virtual machine"], explanation: "" },
  { id: 2518, text: "Cloud computing is:", type: "single", options: ["Requires fewer resources because systems are shared among many users", "Allows users in different geographical regions to work together in real time", "All are correct", "Is made possible by faster internet speeds", "Is useful for both business and home users"], correctAnswer: "All are correct", explanation: "" },
  { id: 2519, text: "Which of the following are properties of a strong password? (choose three)", type: "multiple", options: ["Based on easy to remember items like birthdays", "Long so that it can be reused on multiple sites", "Includes symbols", "At least 10 characters long", "A mix of upper and lower case"], correctAnswer: ["Includes symbols", "At least 10 characters long", "A mix of upper and lower case"], explanation: "" },
  { id: 2520, text: "A license where you don't have access to the source code is called:", type: "single", options: ["Sourceless", "Impaired source", "Open source", "Closed source"], correctAnswer: "Closed source", explanation: "" },
  { id: 2521, text: "A copyleft provision in a software license means:", type: "single", options: ["You must provide support for your modifications", "You may not link against third party closed source software", "If you redistribute the software, you must distribute the source to any changes you make", "You must provide free copies of the software if you use it", "You give up your copyright to the software"], correctAnswer: "If you redistribute the software, you must distribute the source to any changes you make", explanation: "" },
  { id: 2522, text: "The Free Software Foundation believes that: (choose two)", type: "multiple", options: ["Software should be free to modify", "People should write software with no expectation of making money", "Software should not have copyright", "Software should be free to share", "No money should ever change hands"], correctAnswer: ["Software should be free to modify", "Software should be free to share"], explanation: "" },
  { id: 2523, text: "What does it mean when a work is placed in the public domain?", type: "single", options: ["The work was done by a government agency", "You may not use the work for commercial purposes", "The author has died", "The author has relinquished the copyright on the work", "You must redistribute changes to the software"], correctAnswer: "The author has relinquished the copyright on the work", explanation: "" },
  { id: 2524, text: "The semicolon (;) can be used to separate multiple commands to be executed in order. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2525, text: "To be able to output messages to the screen, use the _______ command:", type: "single", options: ["print", "echo", "display", "type"], correctAnswer: "echo", explanation: "" },
  { id: 2526, text: "The _______ command will print a list of the commands that you've previously executed.", type: "single", options: ["list", "eval", "exec", "history"], correctAnswer: "history", explanation: "" },
  { id: 2527, text: "HOME is an example of _________.", type: "single", options: ["A path variable", "A local variable", "An environment variable", "An alias", "An internal command"], correctAnswer: "An environment variable", explanation: "" },
  { id: 2528, text: "The directory where additional documentation for software packages most likely can be found is:", type: "single", options: ["/var/share/doc", "/var/lib/doc", "/usr/software/doc", "/usr/share/doc"], correctAnswer: "/usr/share/doc", explanation: "" },
  { id: 2529, text: "To start searching a man page, the first key you press is:", type: "single", options: ["/", "f", "s", "!"], correctAnswer: "/", explanation: "" },
  { id: 2530, text: "To get help on using the info command, execute: (choose two)", type: "multiple", options: ["man info", "info info", "help info", "info -q"], correctAnswer: ["man info", "info info"], explanation: "" },
  { id: 2531, text: "The _____ command can be used to find any file, not just commands or man pages.", type: "single", options: ["whatis", "locate", "whereis", "apropos"], correctAnswer: "locate", explanation: "" },
  { id: 2532, text: "Hidden files are files that begin with what character?", type: "single", options: ["A period (.)", "An asterisk (*)", "A plus (+)", "A dash (-)"], correctAnswer: "A period (.)", explanation: "" },
  { id: 2533, text: "The top-level directory on a Linux system is represented as:", type: "single", options: ["/", "/home", "/root", "C:"], correctAnswer: "/", explanation: "" },
  { id: 2534, text: "The ls command without options or arguments…", type: "single", options: ["…prompts for a directory to list. of the current directory. …lists the contents", "s home directory."], correctAnswer: "…prompts for a directory to list. of the current directory. …lists the contents", explanation: "" },
  { id: 2535, text: "T…hlisets cthoem comnteanntsd o fl as u s-eSr will sort files: …generates an error as this command requires arguments.", type: "single", options: ["By size, smallest to largest", "By modification date, newest to oldest", "By number of symlinks, largest to smallest", "By size, largest to smallest"], correctAnswer: "By size, largest to smallest", explanation: "" },
  { id: 2536, text: "When using the cp command, you must provide both a source and a destination. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2537, text: "Which option can be used with the rm command to prompt before deleting?", type: "single", options: ["l", "A", "-P", "-i"], correctAnswer: "-i", explanation: "" },
  { id: 2538, text: "Which command would list files that do not begin with a “T” or a “W”?", type: "single", options: ["echo /etc/[!TW]*", "echo /etc/[*TW]!", "echo /etc/!TW", "echo /etc/*[TW!]"], correctAnswer: "echo /etc/[!TW]*", explanation: "" },
  { id: 2539, text: "In general, for which of the following would you want to use lossless compression?", type: "single", options: ["A JPEG image", "A log file", "An encrypted email", "A movie", "An mp3 audio file"], correctAnswer: "A log file", explanation: "" },
  { id: 2540, text: "You type gzip myfile.tar. What happens? (choose two)", type: "multiple", options: ["An error; you forgot to specify the file with -f", "myfile.tar is unarchived into the current directory", "myfile.tar is removed", "An error; you forgot to pass the name of the output file", "myfile.tar.gz holds a compressed version of myfile.tar"], correctAnswer: ["myfile.tar is removed", "myfile.tar.gz holds a compressed version of myfile.tar"], explanation: "" },
  { id: 2541, text: "Which command will show what is inside the compressed tarball with a name of foo.tar.gz?", type: "single", options: ["tar tf foo.tar.gz", "– tar tzf foo.tar.gz –", "tar xf foo.tar.gz", "tar lf foo.tar.gz", "tar –tjf foo.tar.gz"], correctAnswer: "– tar tzf foo.tar.gz –", explanation: "" },
  { id: 2542, text: "By– default, the zip command replaces uncompressed – files with compressed files. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2543, text: "Error messages generated by commands are sent where by default?", type: "single", options: ["STDIN", "Log files", "STDOUT", "STDERR"], correctAnswer: "STDERR", explanation: "" },
  { id: 2544, text: "Which of the following commands will display only lines that begin with test?", type: "single", options: ["grep *test file.txt", "grep &test file.txt", "grep $test* file.txt", "grep ^test file.txt"], correctAnswer: "grep ^test file.txt", explanation: "" },
  { id: 2545, text: "Which of the following commands will display lines that contain either start or end?", type: "single", options: ["egrep start|end file.txt ‘", "egrep start end file.txt", "egrep start&end file.txt", "egrep (start|end) file.txt"], correctAnswer: "egrep start|end file.txt ‘", explanation: "" },
  { id: 2546, text: "A file begins with #!/bin/csh. This means:", type: "single", options: ["This is a Perl script", "The operator should not be using /bin/csh", "C Shell compatibility mode is enabled", "Running the script will invoke /bin/csh to interpret the rest of the file", "Nothing, this is a comment"], correctAnswer: "Running the script will invoke /bin/csh to interpret the rest of the file", explanation: "" },
  { id: 2547, text: "Most of nano's commands take the form of:", type: "single", options: ["Alt and another character", "Escape followed by another character", "The F1 through F12 function keys", "Mouse clicks", "Control and another character"], correctAnswer: "Control and another character", explanation: "" },
  { id: 2548, text: "The if command looks for what exit code to consider a condition to be true?", type: "single", options: ["255", "0", "2", "1", "10"], correctAnswer: "0", explanation: "" },
  { id: 2549, text: "The number of users logged in is in a variable called USERS. How would you test to see if 5 users are logged in?", type: "single", options: ["test $USERS eq 5 –", "test $USERS,5", "test f USERS=5", "test $USERS = 5", "test $–USERS a 5"], correctAnswer: "test $USERS eq 5 –", explanation: "" },
  { id: 2550, text: "Which of the following are valid partitioning types? – (choose two)", type: "multiple", options: ["PC", "MBR", "GPT", "BIOS"], correctAnswer: ["MBR", "GPT"], explanation: "" },
  { id: 2551, text: "Software that allows hardware devices to communicate with the installed operating system is called?", type: "single", options: ["Drivers", "Instructions", "Packages", "Programs"], correctAnswer: "Drivers", explanation: "" },
  { id: 2552, text: "Which of the following commands will check hard disk GPT partitions? (choose three)", type: "multiple", options: ["sfdisk", "sgdisk", "gdisk", "cgdisk", "gfdisk"], correctAnswer: ["sgdisk", "gdisk", "cgdisk"], explanation: "" },
  { id: 2553, text: "The process (ps) command shows only processes running in the current shell by default. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2554, text: "The free command outputs statistics about:", type: "single", options: ["Memory usage", "Disk usage", "Software usage", "CPU usage"], correctAnswer: "Memory usage", explanation: "" },
  { id: 2555, text: "Which file contains the information passed to the kernel at boot time?", type: "single", options: ["/proc/kernel", "/proc/kopts", "/proc/kargs", "/proc/cmdline"], correctAnswer: "/proc/cmdline", explanation: "" },
  { id: 2556, text: "To make changes permanent for kernel parameter files found under /proc/sys, the following file can have entries added to it:", type: "single", options: ["/etc/sysinfo.conf", "/etc/sysctl.conf", "/etc/procctl.conf", "/etc/procsys.conf"], correctAnswer: "/etc/sysctl.conf", explanation: "" },
  { id: 2557, text: "Which of the following commands will display the IP address on a Linux system?", type: "single", options: ["ifconfig", "route", "ipconfig", "dig"], correctAnswer: "ifconfig", explanation: "" },
  { id: 2558, text: "The RSA key fingerprint allows the dig command to connect to remote systems. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2559, text: "When issuing the service network restart command, which of the following occurs?", type: "single", options: ["-reads all related configuration files and then the networking for the system is restarted. …takes down all network interfaces, re", "the system is stopped and then started back up.", "-reads all related configuration files and …thtehne tnheet wneotrwkoinrgk ifnogr for the system is restarted."], correctAnswer: "-reads all related configuration files and then the networking for the system is restarted. …takes down all network interfaces, re", explanation: "" },
  { id: 2560, text: "W…bhrinicghs u op fa llt nheetw foorkll ionwterifnacge sc, roemmands can be used to display socket statistics, and supports all major packet and socket types?", type: "single", options: ["route", "ss", "ifconfig", "top"], correctAnswer: "ss", explanation: "" },
  { id: 2561, text: "Which of the following commands will display the groups that the user bob belongs to?", type: "single", options: ["group bob", "id bob", "all bob", "groups -a"], correctAnswer: "id bob", explanation: "" },
  { id: 2562, text: "Traditional UNIX systems allowed users to belong to how many groups?", type: "single", options: ["65,000", "10,000", "1", "256", "16"], correctAnswer: "16", explanation: "" },
  { id: 2563, text: "A value of 0 in the “minimum” password aging field means the user cannot change their password. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2564, text: "Sudo privileges allow users to execute commands as another user. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2565, text: "The first line of this command displays how long the system has been running since being rebooted.", type: "single", options: ["id", "getent", "who", "w", "su"], correctAnswer: "w", explanation: "" },
  { id: 2566, text: "Which option for the usermod command can be used to specify a user's group ID (either primary or secondary)? (choose two)", type: "multiple", options: ["-g", "-S", "-s", "-G"], correctAnswer: ["-g", "-G"], explanation: "" },
  { id: 2567, text: "The groupmod command can be used to add users to a group. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2568, text: "Which of the following files contains user IDs?", type: "single", options: ["/etc/passwd", "/etc/shadow", "/etc/group", "/etc/usr"], correctAnswer: "/etc/passwd", explanation: "" },
  { id: 2569, text: "Which of the following commands, run as root, will prevent the user bob from logging in?", type: "single", options: ["usermod -L bob", "usermod -D bob", "usermod -d bob", "usermod -l bob"], correctAnswer: "usermod -L bob", explanation: "" },
  { id: 2570, text: "What directory contains a user's home directory?", type: "single", options: ["/rootfs", "/user", "/", "/home"], correctAnswer: "/home", explanation: "" },
  { id: 2571, text: "GIDs under 500 (or 1000) are usually reserved for what kind of groups?", type: "single", options: ["Are not used for groups, but for user accounts", "Administrators", "User private groups (UPG)", "System use"], correctAnswer: "System use", explanation: "" },
  { id: 2572, text: "A user cannot delete a file if they do not own it. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2573, text: "The chown command permits changing group ownership done by root only. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2574, text: "Which of the following commands will list hidden files as well as their ownership?", type: "single", options: ["ls -a", "ls -z", "ls -l", "ls -la"], correctAnswer: "ls -la", explanation: "" },
  { id: 2575, text: "Which of the following commands will set setuid for /usr/bin/program?", type: "single", options: ["chmod 1755 /usr/bin/program", "chmod 4755 /usr/bin/program", "chmod 2755 /usr/bin/program", "None of the above"], correctAnswer: "chmod 4755 /usr/bin/program", explanation: "" },
  { id: 2576, text: "Setting setgid on a directory…", type: "single", options: ["directory.", "…will allow scripts in the directory to be executed as the group owner of the owner of the directory. …will set the group owner of all files created in the directory to the group"], correctAnswer: "…will allow scripts in the directory to be executed as the group owner of the owner of the directory. …will set the group owner of all files created in the directory to the group", explanation: "" },
  { id: 2577, text: "D…ies lneott ianllogw aed sboy uthrec seys tfeimle. will break an associated hard …does nothing. link. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2578, text: "Which of the following commands would create a hard link, link to file?", type: "single", options: ["ln file link", "ln -s link file", "ln link file", "ln -s file link"], correctAnswer: "ln file link", explanation: "" },
  { id: 2579, text: "One of the jobs of the kernel is to:", type: "single", options: ["Transfer mail from one machine to another", "Manage the systems resources", "Turn source code into machine code", "Load the operating system after the computer is turned on"], correctAnswer: "Manage the systems resources", explanation: "" },
  { id: 2580, text: "Unix is: (choose two)", type: "multiple", options: ["A text editor", "An operating system", "A distribution of Linux", "A type of hardware", "A trademark"], correctAnswer: ["An operating system", "A trademark"], explanation: "" },
  { id: 2581, text: "Linux is written in:", type: "single", options: ["C++", "Java", ".NET", "Perl", "C"], correctAnswer: "C", explanation: "" },
  { id: 2582, text: "Source code refers to:", type: "single", options: ["A human readable version of computer software", "The version of a program that the computer runs on the CPU", "The interface that software uses to talk to the kernel", "The license that dictates how you may use and share the software"], correctAnswer: "A human readable version of computer software", explanation: "" },
  { id: 2583, text: "Open source means: (choose two)", type: "multiple", options: ["You must support the software you share", "You cannot charge anything for the software", "You must share your changes", "You can modify the softwares source code", "You can view the softwares source code"], correctAnswer: ["You can modify the softwares source code", "You can view the softwares source code"], explanation: "" },
  { id: 2584, text: "Most of the tools that are part of Linux systems come from:", type: "single", options: ["Red Hat and Debian", "The Open Source Initiative", "The GNU project", "The Linux foundation", "Google"], correctAnswer: "The GNU project", explanation: "" },
  { id: 2585, text: "The Linux platform that runs on mobile phones is called:", type: "single", options: ["LinuxMobile", "IOS", "MicroLinux", "Android", "Teldroid"], correctAnswer: "Android", explanation: "" },
  { id: 2586, text: "What does a distribution provide to add and remove software from the system?", type: "single", options: ["Bash", "Partitioning tool", "Package manager", "Compiler", "Application Programming Interface (API)"], correctAnswer: "Package manager", explanation: "" },
  { id: 2587, text: "Assign initial settings such as network address", type: "single", options: ["Perform the initial installation of the kernel to hard drive", "Load the application into memory", "Install software from the Internet or removable media", "Load the kernel after the computer is powered on"], correctAnswer: "Load the kernel after the computer is powered on", explanation: "" },
  { id: 2588, text: "UNIX was originally invented at:", type: "single", options: ["AT&T Bell Labs", "Xerox PARC", "Berkeley University", "Stanford University", "Bangalore University"], correctAnswer: "AT&T Bell Labs", explanation: "" },
  { id: 2589, text: "A license where you don't have access to the source code is called:", type: "single", options: ["Sourceless", "Open source", "Closed source", "Impaired source"], correctAnswer: "Closed source", explanation: "" },
  { id: 2590, text: "Which distributions are made by, or clones of, Red Hat? (choose two)", type: "multiple", options: ["Ubuntu", "CentOS", "Fedora", "Debian", "Slackware"], correctAnswer: ["CentOS", "Fedora"], explanation: "" },
  { id: 2591, text: "Ubuntu is derived from which distribution?", type: "single", options: ["Slackware", "Scientific Linux", "Red Hat Enterprise Linux", "Debian", "Fedora"], correctAnswer: "Debian", explanation: "" },
  { id: 2592, text: "Open source licenses differ, but generally agree that: (choose two)", type: "multiple", options: ["You should be able modify the software as you wish", "You should have access to the source code of software", "You must redistribute your changes", "You are not allowed to sell the software"], correctAnswer: ["You should be able modify the software as you wish", "You should have access to the source code of software"], explanation: "" },
  { id: 2593, text: "Applications make requests to the kernel and receive resources, such as memory, CPU, and disk in return. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2594, text: "The most important consideration when choosing an operating system is:", type: "single", options: ["Whether or not it is cloud-friendly", "What the computer will do", "The licensing model of the operating system", "How much performance is needed", "The operating systems mascot"], correctAnswer: "What the computer will do", explanation: "" },
  { id: 2595, text: "Linux is not Unix because:", type: "single", options: ["It hasnt undergone certification", "Its not made by the Open Group", "Its not good enough", "It's free", "Th ere are too many distributions"], correctAnswer: "It hasnt undergone certification", explanation: "" },
  { id: 2596, text: "A release cycle:", type: "single", options: ["Is always 6 months", "Doesnt matter in an Open Source environment", "Only applies to software you pay for", "Describes how often updates to the software come out", "Describes how long the software will be supported for"], correctAnswer: "Describes how often updates to the software come out", explanation: "" },
  { id: 2597, text: "A maintenance cycle:", type: "single", options: ["Should be short so you always have the freshest releases", "Should be long so that you have time before you need to upgrade", "Only has meaning for paid software", "Describes how often updates for software come out", "Describes how long a version of software will be supported"], correctAnswer: "Describes how long a version of software will be supported", explanation: "" },
  { id: 2598, text: "If a software release is in a state in that it has many new features that have not been rigorously tested, it is typically referred to as beta software. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2599, text: "Software is backward compatible if:", type: "single", options: ["It works across Linux/Mac/Windows", "It can be upgraded without downtime", "It still supports old file formats or applications", "People still use old versions", "If the next version still works the same way"], correctAnswer: "It still supports old file formats or applications", explanation: "" },
  { id: 2600, text: "Apple's OS X is: (choose three)", type: "multiple", options: ["Primarily used to manage network services", "Certified as UNIX compatible", "Derived from Linux", "Able to natively run Windows binaries", "Only compatible with Apple hardware", "Derived from FreeBSD"], correctAnswer: ["Certified as UNIX compatible", "Only compatible with Apple hardware", "Derived from FreeBSD"], explanation: "" },
  { id: 2601, text: "Microsoft Windows: (choose three)", type: "multiple", options: ["Comes in desktop and server variants", "Has a short maintenance cycle", "Has powerful scripting capabilities", "Has a new desktop version every year.", "Has built in virtualization", "Has a Linux compatibility mode"], correctAnswer: ["Comes in desktop and server variants", "Has powerful scripting capabilities", "Has built in virtualization"], explanation: "" },
  { id: 2602, text: "Other commercial Unixes: (choose two)", type: "multiple", options: ["Are tied to their vendors hardware", "Are almost obsolete", "Are UNIX certified", "Do not run the GNU tools", "Use completely different commands than Linux"], correctAnswer: ["Are tied to their vendors hardware", "Are UNIX certified"], explanation: "" },
  { id: 2603, text: "When choosing a distribution of Linux, you should consider: (choose five)", type: "multiple", options: ["Whether or not the distribution is under active development", "Which management tools are provided by the distribution", "If you need support on the distribution itself", "Popularity on social media.", "The maintenance cycle of the distribution", "Which distributions are supported by the software you need to run"], correctAnswer: ["Whether or not the distribution is under active development", "Which management tools are provided by the distribution", "If you need support on the distribution itself", "The maintenance cycle of the distribution", "Which distributions are supported by the software you need to run"], explanation: "" },
  { id: 2604, text: "The Samba application is a:", type: "single", options: ["File Server", "Mail Server", "Security Server", "Web Server"], correctAnswer: "File Server", explanation: "" },
  { id: 2605, text: "Which of the following are examples of desktop software? (choose two)", type: "multiple", options: ["Compiler", "File share", "Web browser", "Web server", "Music player"], correctAnswer: ["Web browser", "Music player"], explanation: "" },
  { id: 2606, text: "If you wanted to set up a blog, which software would be most helpful?", type: "single", options: ["Samba", "MySQL", "Postfix", "Dovecot", "WordPress"], correctAnswer: "WordPress", explanation: "" },
  { id: 2607, text: "Which of the following pieces of software deal with file sharing? (choose three)", type: "multiple", options: ["Samba", "Netatalk", "PostgreSQL", "NFS", "X-Windows"], correctAnswer: ["Samba", "Netatalk", "NFS"], explanation: "" },
  { id: 2608, text: "If you wanted to create and print an invoice, which software could you use?", type: "single", options: ["Firefox", "LibreOffice", "GNOME", "Compiz", "Evolution"], correctAnswer: "LibreOffice", explanation: "" },
  { id: 2609, text: "POP and IMAP are related to:", type: "single", options: ["Letting users log in to multiple servers with 1 set of credentials", "Email", "Reading and writing music", "Sharing files", "Serving web pages"], correctAnswer: "Email", explanation: "" },
  { id: 2610, text: "When a computer boots, it can get its network information through:", type: "single", options: ["SMTP", "LDAP", "DHCP", "X11", "DNS"], correctAnswer: "DHCP", explanation: "" },
  { id: 2611, text: "Which of the following are examples of text editors? (choose four)", type: "multiple", options: ["pico", "nano", "yum", "vim", "emacs"], correctAnswer: ["pico", "nano", "vim", "emacs"], explanation: "" },
  { id: 2612, text: "A package manager: (choose two)", type: "multiple", options: ["Can optionally repartition your disk to make room for Linux", "Emails you when software is out of date", "Performs a fresh install of Linux", "Downloads software from the Internet", "Keeps track of which files belong to which packages"], correctAnswer: ["Downloads software from the Internet", "Keeps track of which files belong to which packages"], explanation: "" },
  { id: 2613, text: "An interpreted programming language: (choose two)", type: "multiple", options: ["Requires a compilation step but no linking step", "Takes fewer resources to run than a compiled language", "Requires a linking step but no compilation step", "Tends to offer more features than compiled languages", "Is converted into machine specific instructions as the program runs"], correctAnswer: ["Tends to offer more features than compiled languages", "Is converted into machine specific instructions as the program runs"], explanation: "" },
  { id: 2614, text: "Which of the following are true about compiled programming languages?", type: "single", options: ["Ruby is a compiled language", "Compiled languages are great for system administration tasks like scripting", "Perl is a compiled language", "C is a compiled language", "A programmer is usually more productive when using a compiled language"], correctAnswer: "C is a compiled language", explanation: "" },
  { id: 2615, text: "Which package manager is used in Fedora, a Red Hat derived system?", type: "single", options: ["apt-get", "vim", "tar", "bash", "yum"], correctAnswer: "yum", explanation: "" },
  { id: 2616, text: "The Linux shell: (choose three)", type: "multiple", options: ["Is responsible for tracking the location of configuration files", "Is customizable", "Has a built in text editor", "Has a scripting language", "Allows you to launch programs"], correctAnswer: ["Is customizable", "Has a scripting language", "Allows you to launch programs"], explanation: "" },
  { id: 2617, text: "Which application would you use to edit and piece together sound files to make podcast?", type: "single", options: ["Bash", "GIMP", "Thunderbird", "Audiolicious", "Audacity"], correctAnswer: "Audacity", explanation: "" },
  { id: 2618, text: "The two main families of Linux shells are: (choose two)", type: "multiple", options: ["Bourne Shell", "C Shell", "emacs", "Korn shell", "Python Shell"], correctAnswer: ["Bourne Shell", "C Shell"], explanation: "" },
  { id: 2619, text: "Which server software would you use to create a company directory that you could search and authenticate against?", type: "single", options: ["Netatalk", "OpenLDAP", "bind", "ISC DHCP", "Samba"], correctAnswer: "OpenLDAP", explanation: "" },
  { id: 2620, text: "A Mail Transfer Agent's primary purpose is to:", type: "single", options: ["Manage the end users inbox", "Deliver mail between servers", "Act as a gateway between faxes and email", "Filter out spam", "Serve email to end clients"], correctAnswer: "Deliver mail between servers", explanation: "" },
  { id: 2621, text: "Which of the following are examples of a web server? (choose two)", type: "multiple", options: ["postfix", "Apache", "WordPress", "NFS", "Nginx"], correctAnswer: ["Apache", "Nginx"], explanation: "" },
  { id: 2622, text: "If you wanted to let a Linux machine share files with Windows clients and servers, you would use:", type: "single", options: ["NFS", "Samba", "Netatalk", "DNS", "bind"], correctAnswer: "Samba", explanation: "" },
  { id: 2623, text: "Richard Stallman is associated with:", type: "single", options: ["The Free Software Foundation", "BSD Unix", "The Apache foundation", "Microsoft", "The Open Source Initiative"], correctAnswer: "The Free Software Foundation", explanation: "" },
  { id: 2624, text: "A “copyleft provision” in a software license means:", type: "single", options: ["You may not link against third party closed source software", "You give up your copyright to the software", "You must provide support for your modifications", "You must provide free copies of the software if you use it", "If you redistribute the software, you must distribute the source to any changes you make"], correctAnswer: "If you redistribute the software, you must distribute the source to any changes you make", explanation: "" },
  { id: 2625, text: "The largest difference between the GPLv2 and BSD licenses is:", type: "single", options: ["GPLv2 is not approved by the OSI", "Only BSD allows commercial use", "BSD has no copyleft provision", "Nothing, they are virtually identical", "GPLv2 requires assigning copyright to the FSF"], correctAnswer: "BSD has no copyleft provision", explanation: "" },
  { id: 2626, text: "The Free Software Foundation believes that: (choose two)", type: "multiple", options: ["People should write software with no expectation of making money", "Software should be free to share", "No money should ever change hands", "Software should be free to modify", "Software should not have copyright"], correctAnswer: ["Software should be free to share", "Software should be free to modify"], explanation: "" },
  { id: 2627, text: "Which of the following licenses was made by the FSF?", type: "single", options: ["MIT", "Apache", "Creative Commons", "BSD", "GPLv3"], correctAnswer: "GPLv3", explanation: "" },
  { id: 2628, text: "A permissive free software license: (choose two)", type: "multiple", options: ["Places no restrictions on sharing modifications", "Means you can use the software for anything you want", "Does not allow the software to be locked to certain hardware", "Requires you share software changes but not binaries", "Places the software in the public domain"], correctAnswer: ["Places no restrictions on sharing modifications", "Means you can use the software for anything you want"], explanation: "" },
  { id: 2629, text: "Linux is distributed under which license?", type: "single", options: ["Linux Foundation", "GPLv3", "GPLv2", "MIT", "BSD"], correctAnswer: "GPLv2", explanation: "" },
  { id: 2630, text: "Who founded the Open Source Initiative? (choose two)", type: "multiple", options: ["Linus Torvalds", "Richard Stallman", "Eric Raymond", "University of California at Berkeley", "Bruce Perens"], correctAnswer: ["Eric Raymond", "Bruce Perens"], explanation: "" },
  { id: 2631, text: "A generic term for Open Source and Free Software is:", type: "single", options: ["FLOSS", "Libre Software", "GPL", "OS/FS", "SLOFF"], correctAnswer: "FLOSS", explanation: "" },
  { id: 2632, text: "Which are examples of permissive software licenses? (choose two)", type: "multiple", options: ["GPLv3", "MIT", "BSD", "GPLv2", "LGPLv3"], correctAnswer: ["MIT", "BSD"], explanation: "" },
  { id: 2633, text: "What does it mean when a work is placed in the public domain?", type: "single", options: ["You must redistribute changes to the software", "You may not use the work for commercial purposes", "The author has relinquished the copyright on the work", "The author has died", "The work was done by a government agency"], correctAnswer: "The author has relinquished the copyright on the work", explanation: "" },
  { id: 2634, text: "Creative Commons licenses allow you to: (choose three)", type: "multiple", options: ["Specify whether or not changes must be shared", "Specify whether or not people may distribute changes", "Get a veto on where the work is used", "Allow or disallow commercial use", "Receive royalties on the use of the work"], correctAnswer: ["Specify whether or not changes must be shared", "Specify whether or not people may distribute changes", "Allow or disallow commercial use"], explanation: "" },
  { id: 2635, text: "If a podcast is licensed under the CC BY-ND license, you may: (choose two)", type: "multiple", options: ["Add ads to it and post it to your website.", "Sell it as part of a compilation", "Share it as long as you give credit to the author", "Use an interview or song from it for your own podcast", "Post it to your website"], correctAnswer: ["Share it as long as you give credit to the author", "Post it to your website"], explanation: "" },
  { id: 2636, text: "How can you make money from open source software? (choose three)", type: "multiple", options: ["Charge a yearly fee for the right to use the software", "Sell hardware thats built to work with the software", "Provide paid consulting services for users", "Unlock premium features for people that pay", "Take payments for fixing bugs"], correctAnswer: ["Sell hardware thats built to work with the software", "Provide paid consulting services for users", "Take payments for fixing bugs"], explanation: "" },
  { id: 2637, text: "To place software under an open source license, you must give up your copyright. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2638, text: "The difference between the GPL and LGPL licenses are:", type: "single", options: ["LGPL was made by the OSI while GPL was made by the FSF", "LGPL allows linking to non GPLed software", "LGPL applies to web services", "LGPL allows you to distribute the software in binary-only form", "LGPL is shorter than GPL"], correctAnswer: "LGPL allows linking to non GPLed software", explanation: "" },
  { id: 2639, text: "Permissive free software licenses: (choose three)", type: "multiple", options: ["Are not approved by the FSF", "Dont have a copyleft provision", "Can allow software to be used inside closed source software", "Include the GPLv2 and BSD", "Are not approved by the OSI"], correctAnswer: ["Are not approved by the FSF", "Dont have a copyleft provision", "Can allow software to be used inside closed source software"], explanation: "" },
  { id: 2640, text: "The Creative Commons version of Public Domain licensing is:", type: "single", options: ["Attribution-NonCommercial", "Attribution-NonCommercial-ShareAlike", "No Rights Reserved", "Attribution", "NoAttribution-ShareAlike"], correctAnswer: "No Rights Reserved", explanation: "" },
  { id: 2641, text: "Your company makes a hardware firewall that runs a custom Linux kernel. What are your obligations under GPLv2?", type: "single", options: ["You must make the source to your custom web interface available", "You must make your hardware designs available", "You must make the source to your kernel available", "You must ensure your custom kernel runs on a regular Intel machine", "There are no requirements"], correctAnswer: "You must make the source to your kernel available", explanation: "" },
  { id: 2642, text: "Participating in open source projects can improve your technical skills, even if it is not your day job. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2643, text: "Which of the following is true about graphical mode? (choose three)", type: "multiple", options: ["You have menus and tools to help you find what you are looking for", "You cannot use your mouse", "After login, you are provided with a command prompt", "You access this mode by logging into a graphical display", "After login, you are provided with a desktop"], correctAnswer: ["You have menus and tools to help you find what you are looking for", "You access this mode by logging into a graphical display", "After login, you are provided with a desktop"], explanation: "" },
  { id: 2644, text: "Which of the following is provided by a graphical interface that isn't normally provided to a non graphical interface? (choose four)", type: "multiple", options: ["Popups", "Desktop", "Windows", "Menus", "Shell"], correctAnswer: ["Popups", "Desktop", "Windows", "Menus"], explanation: "" },
  { id: 2645, text: "A server is likely to be running in graphical mode. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2646, text: "In graphical mode, you can get to a shell by running which applications? (choose two)", type: "multiple", options: ["terminal", "guiterm", "xconsole", "xterm", "gbash"], correctAnswer: ["terminal", "xterm"], explanation: "" },
  { id: 2647, text: "Which of the following are traits of a multiuser operating system? (choose three)", type: "multiple", options: ["Each user can only log in once per day", "Users can protect their information from other users", "Many users can log in simultaneously with a unique account", "An administrative user gets a dedicated CPU", "Resources are shared between users"], correctAnswer: ["Users can protect their information from other users", "Many users can log in simultaneously with a unique account", "Resources are shared between users"], explanation: "" },
  { id: 2648, text: "Virtualization means:", type: "single", options: ["A single host can be split up into multiple guests", "A user can connect to a server over the network and use a virtual console", "A machine can swap memory to disk", "Many users can share one hard drive", "Two users get different memory spaces on the same machine"], correctAnswer: "A single host can be split up into multiple guests", explanation: "" },
  { id: 2649, text: "In virtualization, what are the host and guest? (choose two)", type: "multiple", options: ["A guest is a virtual machine", "The terms can be used interchangeably", "The host is the machine that runs the virtual machines", "The guest is the machine that runs the virtual machines", "A host is a virtual machine"], correctAnswer: ["A guest is a virtual machine", "The host is the machine that runs the virtual machines"], explanation: "" },
  { id: 2650, text: "Which of the following are traits of cloud computing? (choose two)", type: "multiple", options: ["The resources are virtualized", "You dont have to worry about performance any more", "You pay for what you use", "Only Linux works in cloud computing", "You own the hardware but pay for it over time"], correctAnswer: ["The resources are virtualized", "You pay for what you use"], explanation: "" },
  { id: 2651, text: "If you wanted to write a report that was to be printed, you would probably use:", type: "single", options: ["Adobe Flash", "LibreOffice", "Chrome", "Firefox", "A wiki"], correctAnswer: "LibreOffice", explanation: "" },
  { id: 2652, text: "If you want to store logins and passwords for different websites in a secure manner, you could use:", type: "single", options: ["A sticky note on your monitor", "A text file in your home directory", "KeePassX", "A LibreOffice Document", "Firefox"], correctAnswer: "KeePassX", explanation: "" },
  { id: 2653, text: "You can configure your computer to check for updates automatically. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2654, text: "Two components that provide the ability to implement a firewall include: (choose two)", type: "multiple", options: ["iptables", "Uncomplicated Firewall", "ipfw", "gufw", "Cerberus"], correctAnswer: ["iptables", "gufw"], explanation: "" },
  { id: 2655, text: "What are tradeoffs of increasing the level of privacy you have in your web browser? (choose two)", type: "multiple", options: ["You may have to explicitly permit some cookies to be saved", "Websites may load slower", "You may get viruses", "Sites may not work properly", "Images wont load properly"], correctAnswer: ["You may have to explicitly permit some cookies to be saved", "Sites may not work properly"], explanation: "" },
  { id: 2656, text: "Which of the following is a tool that helps you anonymize your Internet browsing?", type: "single", options: ["The onion router", "CookieCleaner", "iptables", "Web proxy", "AnonFirefox"], correctAnswer: "The onion router", explanation: "" },
  { id: 2657, text: "Social network “like” buttons can track your activity across the Internet. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2658, text: "Which of the following are properties of a strong password? (choose three)", type: "multiple", options: ["Long so that it can be reused on multiple sites", "Based on easy to remember items like birthdays", "At least 10 characters long", "Includes symbols", "A mix of upper and lower case"], correctAnswer: ["At least 10 characters long", "Includes symbols", "A mix of upper and lower case"], explanation: "" },
  { id: 2659, text: "What can be done to prevent remote people from running programs on your computer? (choose two)", type: "multiple", options: ["Dont use wireless networks only wired", "– Use strong passwords on all user accounts", "Turn on a firewall", "Block all cookies", "Block third party cookies"], correctAnswer: ["– Use strong passwords on all user accounts", "Turn on a firewall"], explanation: "" },
  { id: 2660, text: "Select all the applications that provide access to the Command Line Interface (CLI)? (choose two)", type: "multiple", options: ["Virtual Terminal", "firefox", "opera", "Terminal window"], correctAnswer: ["Virtual Terminal", "Terminal window"], explanation: "" },
  { id: 2661, text: "Which environment variable contains a list of directories that is searched for commands to execute?", type: "single", options: ["EXEC", "PATH", "PS2", "PS1"], correctAnswer: "PATH", explanation: "" },
  { id: 2662, text: "Select the command that can report the location of a command:", type: "single", options: ["where", "which", "what"], correctAnswer: "which", explanation: "" },
  { id: 2663, text: "A pair of single quotes ( ‘ ) will prevent the shell from interpreting any metacharacter. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2664, text: "A pair of double quotes ( ” ) will prevent the shell from interpreting any metacharacter. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2665, text: "Using a pair of back quotes ( ` ) will cause a shell to execute the back-quoted text as a command and substitute the output back into the original command. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2666, text: "Which of the following are glob characters? (choose three)", type: "multiple", options: ["The dash character -", "“ “ The asterisk * “ ”", "The question mark ? “ ”", "The square brackets [ and ] “ ” “ ”"], correctAnswer: ["“ “ The asterisk * “ ”", "The question mark ? “ ”", "The square brackets [ and ] “ ” “ ”"], explanation: "" },
  { id: 2667, text: "The semicolon “;” can be used to separate multiple commands to be executed in order. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2668, text: "The double ampersand characters ( && ) are used to separate commands to be executed conditionally, where if the command to the left of the ampersands fails, then the command to the right of the ampersands will be executed. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2669, text: "To be able to output messages to the screen, use the _______ command:", type: "single", options: ["display", "type", "print", "echo"], correctAnswer: "echo", explanation: "" },
  { id: 2670, text: "The _______ command will print a list of the commands that you've previously executed.", type: "single", options: ["list", "history", "exec", "eval"], correctAnswer: "history", explanation: "" },
  { id: 2671, text: "To execute the same command as previously executed five commands ago, you would type:", type: "single", options: ["&5", "@-5", "!-5", "!5"], correctAnswer: "!-5", explanation: "" },
  { id: 2672, text: "The shell program interprets the commands you type into the terminal, into instructions that the Linux operating system can execute. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2673, text: "The acronym CLI stands for:", type: "single", options: ["Computer Line Interface", "Computer Link Interpreter", "Command Line Interpreter", "Command Line Interface"], correctAnswer: "Command Line Interface", explanation: "" },
  { id: 2674, text: "Traditional UNIX command options used a single dash, like -a; _______ command options use two dashes like –all.", type: "single", options: ["LINUX", "shell", "GNU", "Kernel"], correctAnswer: "GNU", explanation: "" },
  { id: 2675, text: "The acronym GNU stands for:", type: "single", options: ["Gnus Not Unix", "Gnus Nearly Unix", "Good News Unix", "Go Next Unit"], correctAnswer: "Gnus Not Unix", explanation: "" },
  { id: 2676, text: "What one character treats the character that follows it as if it was surrounded by single quotes?", type: "single", options: ["/", "#", "\\", "%"], correctAnswer: "\\", explanation: "" },
  { id: 2677, text: "The main purpose of using glob characters is to be able to provide a command a list of filenames. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2678, text: "Question ID 366 Which command will send text to the terminal display:", type: "single", options: ["echo", "type", "print", "show"], correctAnswer: "echo", explanation: "" },
  { id: 2679, text: "Question ID 367 To replace the currently running shell, you can use:", type: "single", options: ["dash", "bash", "exec", "csh"], correctAnswer: "exec", explanation: "" },
  { id: 2680, text: "Question ID 368 To display your current location within the filesystem, you can type:", type: "single", options: ["whereami", "cwd", "dir", "pwd"], correctAnswer: "pwd", explanation: "" },
  { id: 2681, text: "Question ID 369 The _____ command displays information about the Linux kernel:", type: "single", options: ["kern", "uname", "real", "linux"], correctAnswer: "uname", explanation: "" },
  { id: 2682, text: "Question ID 371 The basic form of a command line is:", type: "single", options: ["command [options…] [arguments…]", "command arguments options", "ccoommmmaanndd [arguments…] options"], correctAnswer: "command [options…] [arguments…]", explanation: "" },
  { id: 2683, text: "Question ID 372 [options…] arguments… Bash is:", type: "single", options: ["a website", "a networking term", "a shell", "an operating system"], correctAnswer: "a shell", explanation: "" },
  { id: 2684, text: "Question ID 374 The two login types are:", type: "single", options: ["URI and CLU", "CLI and GUI", "URI and CLI", "GUX and CLI"], correctAnswer: "CLI and GUI", explanation: "" },
  { id: 2685, text: "Question ID 375 The core software component that tells the hardware what actions to take is called the ________.", type: "single", options: ["compiler", "kernel", "transmitter"], correctAnswer: "kernel", explanation: "" },
  { id: 2686, text: "Question ID 376 A command can be: (choose three)", type: "multiple", options: ["An alias", "A block", "A configuration file", "A variable", "A function", "A program built-in to the shell"], correctAnswer: ["An alias", "A function", "A program built-in to the shell"], explanation: "" },
  { id: 2687, text: "Question ID 377 Which of the following are valid command lines? (choose two)", type: "multiple", options: ["ls /etc -l", "ls -l /etc", "ls -/etc", "-l ls /etc"], correctAnswer: ["ls /etc -l", "ls -l /etc"], explanation: "" },
  { id: 2688, text: "Question ID 378 You want to execute the ls command with two options: -r and -l. Which of the following are valid ways to run this command: (choose three)", type: "multiple", options: ["rl ls", "ls -r -l", "ls -l -r", "ls r l", "ls rl", "– – ls -rl"], correctAnswer: ["ls -r -l", "ls -l -r", "– – ls -rl"], explanation: "" },
  { id: 2689, text: "Question ID 380 You can pass arguments to long options by using which of the following techniques: (choose two)", type: "multiple", options: ["option{argument}", "option~argument", "– – option=argument –", "option argument –"], correctAnswer: ["– – option=argument –", "option argument –"], explanation: "" },
  { id: 2690, text: "Question ID 385 When typing a command, you can have the bash shell complete the command by pressing which key?", type: "single", options: ["The Up Arrow key", "The Del key", "The Backspace key", "The Tab key", "The Enter key"], correctAnswer: "The Tab key", explanation: "" },
  { id: 2691, text: "Question ID 868 The location of users default shells is stored in the ______ file.", type: "single", options: ["/etc/passwd", "/etc/group", "/etc/gshadow", "/etc/shadow"], correctAnswer: "/etc/passwd", explanation: "" },
  { id: 2692, text: "Question ID 869 Long command options are preceded by which two characters?", type: "single", options: ["&&", "—", "||", "**"], correctAnswer: "—", explanation: "" },
  { id: 2693, text: "Question ID 870 Which two characters do you use to tell the command that you are finished providing options and that the remaining data on the command line is arguments?", type: "single", options: ["—", "**", "||", "&&"], correctAnswer: "—", explanation: "" },
  { id: 2694, text: "Question ID 871 The _____ command will take another command for the argument to execute.", type: "single", options: ["exit", "uname", "exec", "pwd"], correctAnswer: "exec", explanation: "" },
  { id: 2695, text: "Question ID 872 The _____ option to the uname command will display the kernel name.", type: "single", options: ["-s", "-x", "-k", "-n"], correctAnswer: "-s", explanation: "" },
  { id: 2696, text: "Question ID 873 The ______ command will display your current working directory.", type: "single", options: ["uname", "exec", "pwd", "exit"], correctAnswer: "pwd", explanation: "" },
  { id: 2697, text: "Question ID 370 Which command is used in order to view the manual page for a topic?", type: "single", options: ["show", "man", "help", "doc"], correctAnswer: "man", explanation: "" },
  { id: 2698, text: "Question ID 386 The command manual ls will provide detailed information about how the ls command functions. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2699, text: "Question ID 389 Which of the following man page sections will provide an example of how a command is executed?", type: "single", options: ["The SYNOPSIS section", "The DESCRIPTION section", "The FILES section", "The NAME section"], correctAnswer: "The SYNOPSIS section", explanation: "" },
  { id: 2700, text: "Question ID 390 The [ ] characters around day in the example cal [- smjy13] [[[day] month] year] means that day is:", type: "single", options: ["An argument that must be day and nothing else", "An option, not an argument", "Required “ ”", "Optional"], correctAnswer: "Optional", explanation: "" },
  { id: 2701, text: "Question ID 391 The syntax [-u|–utc|–universal] means:", type: "single", options: ["These three options are different", "These three options mean the same thing", "These are required options", "This is invalid syntax"], correctAnswer: "These three options mean the same thing", explanation: "" },
  { id: 2702, text: "Question ID 395 The command man 5 passwd will:", type: "single", options: ["Display the man page of Section 5 for passwd.", "Print the first five man pages that refer to the term passwd.", "Not work; you cant give a numeric argument to the man command.", "Display the first five lines of the man page for the passwd command."], correctAnswer: "Display the man page of Section 5 for passwd.", explanation: "" },
  { id: 2703, text: "Question ID 8 74 To see a list of commands that are available while viewing a man page, you can type the __ character.", type: "single", options: ["w", "h", "g", "c"], correctAnswer: "h", explanation: "" },
  { id: 2704, text: "Question ID 875 To search for something while viewing a man page, you first type a __ character.", type: "single", options: [">", "|", "<", "/"], correctAnswer: "/", explanation: "" },
  { id: 2705, text: "Question ID 876 Special file man pages are typically located in section ____.", type: "single", options: ["3", "4", "1", "2"], correctAnswer: "4", explanation: "" },
  { id: 2706, text: "Question ID 877 System Administration man pages are typically located in section ___.", type: "single", options: ["8", "6", "7", "9"], correctAnswer: "8", explanation: "" },
  { id: 2707, text: "Question ID 878 Shell command man pages are typically located in section ___.", type: "single", options: ["1", "3", "4", "2"], correctAnswer: "1", explanation: "" },
  { id: 2708, text: "Question ID 553 If you want to see the entire contents of a text file, you can use the _____ command:", type: "single", options: ["dog", "type", "wc", "cat"], correctAnswer: "cat", explanation: "" },
  { id: 2709, text: "Question ID 554 The expand and unexpand commands change: (choose two)", type: "multiple", options: ["New lines", "Carriage returns", "Spaces", "Tabs"], correctAnswer: ["Spaces", "Tabs"], explanation: "" },
  { id: 2710, text: "Question ID 555 The head -n -1 readme.txt command will:", type: "single", options: ["Show the first character of every line of readme.txt", "Display all but the last line of readme.txt", "Number the lines of readme.txt", "Display the first line of readme.txt"], correctAnswer: "Display all but the last line of readme.txt", explanation: "" },
  { id: 2711, text: "Question ID 556 Why would you press CTRL+C when executing tail?", type: "single", options: ["To capture the output into a file", "To complete the processing of a file", "To stop tail from following a file", "To get tail to copy the text it is outputting"], correctAnswer: "To stop tail from following a file", explanation: "" },
  { id: 2712, text: "Question ID 557 Which command merges two files like related tables in a database?", type: "single", options: ["paste", "join", "sql", "query"], correctAnswer: "join", explanation: "" },
  { id: 2713, text: "Question ID 558 Which command will merge two files together line by line?", type: "single", options: ["combo", "paste", "join", "merge"], correctAnswer: "paste", explanation: "" },
  { id: 2714, text: "Question ID 559 Which of the following is a non-interactive editor?", type: "single", options: ["ed", "vi", "nano", "sed"], correctAnswer: "sed", explanation: "" },
  { id: 2715, text: "Question ID 560 If you want to break apart a large file into smaller files, you can use:", type: "single", options: ["split", "cat", "break", "dump"], correctAnswer: "split", explanation: "" },
  { id: 2716, text: "Question ID 561 Select the function that the tr command cannot perform:", type: "single", options: ["Translate from one set of characters to another", "Delete specific characters", "Eliminate duplicate characters", "Insert characters"], correctAnswer: "Insert characters", explanation: "" },
  { id: 2717, text: "Question ID 562 Which command will remove consecutive duplicate lines from a file?", type: "single", options: ["unique", "uniq", "dup", "dedup"], correctAnswer: "uniq", explanation: "" },
  { id: 2718, text: "Question ID 563 If you want to extract fields from a file, you can use:", type: "single", options: ["cols", "extract", "fields", "cut"], correctAnswer: "cut", explanation: "" },
  { id: 2719, text: "Question ID 564 If you want to set the maximum line width for a text file, you can use:", type: "single", options: ["od", "fmt", "pager", "format"], correctAnswer: "fmt", explanation: "" },
  { id: 2720, text: "Question ID 565 This command displays binary files in a variety of representations:", type: "single", options: ["od", "format", "cut", "cat"], correctAnswer: "od", explanation: "" },
  { id: 2721, text: "Question ID 566 If you want a file to be displayed with its lines numbered, you can use:", type: "single", options: ["nl", "cut", "fmt", "number"], correctAnswer: "nl", explanation: "" },
  { id: 2722, text: "Question ID 567 To put the lines of a file in alphabetical order, you can run:", type: "single", options: ["uniq", "sort", "cat", "paste"], correctAnswer: "sort", explanation: "" },
  { id: 2723, text: "Question ID 568 The _____ command provides many options for formatting a file for printing.", type: "single", options: ["pr", "format", "print", "header"], correctAnswer: "pr", explanation: "" },
  { id: 2724, text: "Question ID 1392 Two tables have columns with the same field names. What is required in order to join the two tables?", type: "single", options: ["Change field names in one of the tables to make it unambiguous", "Join between such tables cannot be created", "Create a dummy table which has no common fields", "Field names must be prefixed by the table name and a period"], correctAnswer: "Field names must be prefixed by the table name and a period", explanation: "" },
  { id: 2725, text: "Question ID 396 If you want to delete a variable, you can run:", type: "single", options: ["wipe", "clear", "delete", "unset"], correctAnswer: "unset", explanation: "" },
  { id: 2726, text: "Question ID 397 To view all current variables, you can use:", type: "single", options: ["dump", "var", "view", "set"], correctAnswer: "set", explanation: "" },
  { id: 2727, text: "Question ID 398 To process a script file in the current context, you execute: (choose two)", type: "multiple", options: [".", "include", "source", "exec"], correctAnswer: [".", "source"], explanation: "" },
  { id: 2728, text: "Question ID 399 Environment variables can be viewed by running: (choose two)", type: "multiple", options: ["export -e", "vars", "export -p", "env"], correctAnswer: ["export -p", "env"], explanation: "" },
  { id: 2729, text: "Question ID 400 The PATH environment variable is used for:", type: "single", options: ["Specifying locations that are writable for the user", "Specifying directories to search for executable files", "Specifying directories to contain documentation", "Specifying locations where ordinary users can navigate"], correctAnswer: "Specifying directories to search for executable files", explanation: "" },
  { id: 2730, text: "Question ID 401 Which of the following will create a variable?", type: "single", options: ["VAR+value", "VAR=value", "VAR value", "Var~value"], correctAnswer: "VAR=value", explanation: "" },
  { id: 2731, text: "Question ID 402 Which character(s) cannot be placed in variable names?", type: "single", options: ["Upper-case alpha characters", "Hyphen ( - ) character “ “", "Underscore ( _ ) character", "Lower-case alpha characters", "Numeric char“ac”ters"], correctAnswer: "Hyphen ( - ) character “ “", explanation: "" },
  { id: 2732, text: "Question ID 403 Shell variables are used to:", type: "single", options: ["Reboot the system", "Prevent users from logging in", "Hide passwords", "Hold critical system information"], correctAnswer: "Hold critical system information", explanation: "" },
  { id: 2733, text: "Question ID 404 Local variables are:", type: "single", options: ["Are not a valid type of variable", "Passed into other shells and commands", "Only available to the shell they are created in", "Not used by shells at all"], correctAnswer: "Only available to the shell they are created in", explanation: "" },
  { id: 2734, text: "Question ID 405 Environment variables are:", type: "single", options: ["Only available to the shell they are created in", "Are not a valid type of variable", "Passed into other shells and commands", "Not used by shells at all"], correctAnswer: "Passed into other shells and commands", explanation: "" },
  { id: 2735, text: "Question ID 406 Environment variables cannot be declared by which command?", type: "single", options: ["typeset", "declare", "export", "set"], correctAnswer: "set", explanation: "" },
  { id: 2736, text: "Question ID 408 The PATH variable will be used under which situation?", type: "single", options: ["The command is an alias.", "The command is not found.", "A full path name to a command is provided.", "The command is a function."], correctAnswer: "The command is not found.", explanation: "" },
  { id: 2737, text: "Question ID 409 The /bin directory contains:", type: "single", options: ["Nothing; it is not a valid directory", "The most fundamental commands that are essential for the operating system to function", "Commands that have been compiled from local sources", "Essential administrative commands"], correctAnswer: "The most fundamental commands that are essential for the operating system to function", explanation: "" },
  { id: 2738, text: "Question ID 410 The /sbin directory contains:", type: "single", options: ["Commands that have been compiled from local sources", "Nothing; it is not a valid directory", "The most fundamental commands that are essential", "Essential administrative commands"], correctAnswer: "Essential administrative commands", explanation: "" },
  { id: 2739, text: "Question ID 411 The /usr/local/bin directory contains:", type: "single", options: ["The most fundamental commands that are essential for the operating system to function", "Nothing; it is not a valid directory", "Commands that have been compiled from local sources", "Essential administrative commands"], correctAnswer: "Commands that have been compiled from local sources", explanation: "" },
  { id: 2740, text: "Question ID 413 The path testdir/file.txt is:", type: "single", options: ["An invalid path", "A relative path", "A circular path", "An absolute path"], correctAnswer: "A relative path", explanation: "" },
  { id: 2741, text: "Question ID 414 The path /data/file.txt is:", type: "single", options: ["A circular path", "An absolute path", "A relative path", "An invalid path"], correctAnswer: "An absolute path", explanation: "" },
  { id: 2742, text: "Question ID 417 Which of the following is a valid way to add the /data directory to the existing PATH variable?", type: "single", options: ["$PATH=$PATH:/data", "PATH=$PATH:/data", "$PATH=/data", "PATH=/data"], correctAnswer: "PATH=$PATH:/data", explanation: "" },
  { id: 2743, text: "Question ID 419 Which of the following files is specific to each user and executed every time a bash shell is opened?", type: "single", options: ["~/.bashrc", "~/.bash_profile", "/etc/bashrc", "/etc/profile"], correctAnswer: "~/.bashrc", explanation: "" },
  { id: 2744, text: "Question ID 420 Which of the following files is specific to each user and executed only during login?", type: "single", options: ["~/.bash_profile", "/etc/profile", "/etc/bashrc", "~/.bashrc"], correctAnswer: "~/.bash_profile", explanation: "" },
  { id: 2745, text: "Question ID 421 Which of the following files is for all bash shell users and executed every time a bash shell is opened?", type: "single", options: ["/etc/bashrc", "/etc/profile", "~/.bashrc", "~/.bash_profile"], correctAnswer: "/etc/bashrc", explanation: "" },
  { id: 2746, text: "Question ID 422 Which of the following files is for all bash shell users and executed only at login?", type: "single", options: ["~/.bash_profile", "~/.bashrc", "/etc/bashrc", "/etc/profile"], correctAnswer: "/etc/profile", explanation: "" },
  { id: 2747, text: "Question ID 425 Which of the following commands will execute the last command that started with ec:", type: "single", options: ["!!", "!!ec", "!ec", "!-ec"], correctAnswer: "!ec", explanation: "" },
  { id: 2748, text: "Question ID 879 An absolute path always starts with which character?", type: "single", options: [".", "/", "~"], correctAnswer: "/", explanation: "" },
  { id: 2749, text: "Question ID 880 In the PATH variable, the __ character is used to separate the directories.", type: "single", options: [":", ";", "~", "/"], correctAnswer: ":", explanation: "" },
  { id: 2750, text: "Question ID 881 The _____ command will allow you to see commands that you have previously executed.", type: "single", options: ["hist", "previous", "history", "last"], correctAnswer: "history", explanation: "" },
  { id: 2751, text: "Question ID 882 The _____ variable stores directories that the shell used to find executable files.", type: "single", options: ["CD", "DIR", "PATHS", "PATH"], correctAnswer: "PATH", explanation: "" },
  { id: 2752, text: "Question ID 883 When specifying a path, the __ character symbolizes the current directory.", type: "single", options: ["..", "/", "~", "."], correctAnswer: ".", explanation: "" },
  { id: 2753, text: "Question ID 884 Which file can you place in your home directory to be executed when you log off the system?", type: "single", options: ["/etc/bashrc", "~/.bash_logout", "~/.bashrc", "~/.bash_profile"], correctAnswer: "~/.bash_logout", explanation: "" },
  { id: 2754, text: "Question ID 885 The _____ command will tell you if a command exists as a built-in command, function, alias or a command located within the PATH variable.", type: "single", options: ["set", "export", "declare", "type"], correctAnswer: "type", explanation: "" },
  { id: 2755, text: "Question ID 474 The ls command will list which of the following by default?", type: "single", options: ["The root directory", "The current directory", "Nothing; it requires an argument", "Users home directory"], correctAnswer: "The current directory", explanation: "" },
  { id: 2756, text: "Question ID 475  User home directories often contain hidden files. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2757, text: "Question ID 476 Use the ___ option to display hidden files with the ls command.", type: "single", options: ["-A", "-h", "-D", "-a"], correctAnswer: "-a", explanation: "" },
  { id: 2758, text: "Question ID 477 The ls command can list the contents of only one directory at a time. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2759, text: "Question ID 478 The “.” in an ls listing represents:", type: "single", options: ["Directories that cant be accessed", "Hidden files", "The end of the comm and output", "The current directory"], correctAnswer: "The current directory", explanation: "" },
  { id: 2760, text: "Question ID 479 To perform a “long listing” to show file details, use which of the following commands:", type: "single", options: ["ls -D", "ls -L", "ll", "ls -l"], correctAnswer: "ls -l", explanation: "" },
  { id: 2761, text: "Question ID 480 Using the touch command and specifying a nonexistent file…", type: "single", options: ["prompts the user to create a file.", "creates a blank file with that name.", "generates an error.", "does nothing."], correctAnswer: "creates a blank file with that name.", explanation: "" },
  { id: 2762, text: "Question ID 482 The touch command can be used to change a file's time-stamp to something other than the current system time. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2763, text: "Question ID 483 By default, what does the cp command preserve from the original file?", type: "single", options: ["The timestamps", "The name", "The permissions and ownership", "The contents"], correctAnswer: "The contents", explanation: "" },
  { id: 2764, text: "Question ID 484 To copy the contents of a directory, use the following option(s) for the cp command: (choose two)", type: "multiple", options: ["-A", "-r", "-d", "-R"], correctAnswer: ["-r", "-R"], explanation: "" },
  { id: 2765, text: "Question ID 485 To maintain timestamps when using the cp command, use:", type: "single", options: ["-T", "-A", "-a", "-t"], correctAnswer: "-a", explanation: "" },
  { id: 2766, text: "Question ID 486 The mv command can be used to move more than one file at a time. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2767, text: "Question ID 487 The mv command will rename a file when a new directory is not specified. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2768, text: "Question ID 488 Which option for the rm command will cause it to prompt before deleting files?", type: "single", options: ["-I", "-p", "-i", "-a"], correctAnswer: "-i", explanation: "" },
  { id: 2769, text: "Question ID 489 Which option(s) for the rm command can be used to delete directories that contain files? (choose two)", type: "multiple", options: ["-r", "-R", "-A", "-D"], correctAnswer: ["-r", "-R"], explanation: "" },
  { id: 2770, text: "Question ID 490 The rm command can be used with glob characters to delete multiple files. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2771, text: "Question ID 491 The mkdir command cannot be used to:", type: "single", options: ["Delete a directory", "Create new directories", "Create multiple directories at once", "Create sub-directories in different parent directories"], correctAnswer: "Delete a directory", explanation: "" },
  { id: 2772, text: "Question ID 492 Which mkdir option should be used to create parent directories (that don't already exist) along with the specified directory?", type: "single", options: ["-F", "-d", "-A", "-p"], correctAnswer: "-p", explanation: "" },
  { id: 2773, text: "Question ID 493 The rmdir command can be used to delete directories and their contents. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2774, text: "Question ID 494 The ls-l command output will not include:", type: "single", options: ["File permissions", "Timestamp", "Hard link count", "File contents"], correctAnswer: "File contents", explanation: "" },
  { id: 2775, text: "Question ID 495 Which character at the beginning of a long listing indicates a directory?", type: "single", options: ["l", "–c", "d"], correctAnswer: "d", explanation: "" },
  { id: 2776, text: "Question ID 496 Which character at the beginning of a long listing indicates a regular file?", type: "single", options: ["l", "d", "–", "c"], correctAnswer: "–", explanation: "" },
  { id: 2777, text: "Question ID 497 Which character at the beginning of a long listing indicates a symbolic link?", type: "single", options: ["d", "c", "– l"], correctAnswer: "– l", explanation: "" },
  { id: 2778, text: "Question ID 498 The names of hidden files begin with the ___ character.", type: "single", options: ["*", ">", "+", "."], correctAnswer: ".", explanation: "" },
  { id: 2779, text: "Question ID 499 Which option to the ls command will sort the output by size instead of alphabetically?", type: "single", options: ["-r", "-s", "-S", "-t"], correctAnswer: "-S", explanation: "" },
  { id: 2780, text: "Question ID 500 Which option to the ls command will sort the output by time-stamp?", type: "single", options: ["-t", "-s", "-S", "-r"], correctAnswer: "-t", explanation: "" },
  { id: 2781, text: "Question ID 501 Which option to the ls command will reverse the sort order?", type: "single", options: ["-t", "-r", "-S", "-s"], correctAnswer: "-r", explanation: "" },
  { id: 2782, text: "Question ID 502 The file command uses _____ to determine file types.", type: "single", options: ["magic", "the magic file “ ”", "alchemy", "a random number generator"], correctAnswer: "the magic file “ ”", explanation: "" },
  { id: 2783, text: "Question ID 898 By default, using the touch command on an existing file will update the file's _____.", type: "single", options: ["Timestamp", "Type", "Permissions", "Ownership"], correctAnswer: "Timestamp", explanation: "" },
  { id: 2784, text: "Question ID 456 Which of the following is not used for globbing?", type: "single", options: ["[", "#", "?", "*"], correctAnswer: "#", explanation: "" },
  { id: 2785, text: "Question ID 460 How many times can you use a * glob character in a pattern?", type: "single", options: ["Two", "No limit", "Three", "One"], correctAnswer: "No limit", explanation: "" },
  { id: 2786, text: "Question ID 461 The command echo a* will display:", type: "single", options: ["All of the files in the current directory that begin with an a character. “ ”", "Only the file named a* .", "All of the files in any directory that begin with an a character.", "All of the files in the “cur”rent directory that begin with an a or A character."], correctAnswer: "All of the files in the current directory that begin with an a character. “ ”", explanation: "" },
  { id: 2787, text: "Question ID 462 “ ” “ ” “ ” The command echo ???a will display:", type: "single", options: ["All of the files in the current directory that have four characters in the file name.", "All of the files in the current directory that have four characters in the file name with the last character being an a character. “ ”", "All of the files in the current directory that end with an a character.", "Only a file named ???a"], correctAnswer: "All of the files in the current directory that have four characters in the file name with the last character being an a character. “ ”", explanation: "" },
  { id: 2788, text: "Question ID 463 “ ” Which of the following characters can be used to negate (indicate NOT matching the following characters), when placed as the first of a set of characters enclosed in square brackets [] ? (choose two)", type: "multiple", options: ["?", "^", "~", "!"], correctAnswer: ["^", "!"], explanation: "" },
  { id: 2789, text: "Question ID 464 The range defined inside of square brackets is based on the:", type: "single", options: ["Standard text table", "ASCII text table", "Invalid question as ranges are not permitted", "ANSI text table"], correctAnswer: "ASCII text table", explanation: "" },
  { id: 2790, text: "Question ID 465 To view the ASCII text table in Linux, you can use the following command:", type: "single", options: ["view ASCII", "list ACSII", "man ASCII", "echo ASCII"], correctAnswer: "man ASCII", explanation: "" },
  { id: 2791, text: "Question ID 466 Within square brackets, (Example: [?]) the ? character means:", type: "single", options: ["Match a ? character", "Match zero or more of any ? characters", "Exactly one character", "Nothing, it has no meaning at all"], correctAnswer: "Match a ? character", explanation: "" },
  { id: 2792, text: "Question ID 467 You can combine glob characters in a single pattern, for example: a??*[0-9]. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2793, text: "Question ID 469 Which command will display more information about globbing?", type: "single", options: ["echo globbing", "man 7 globbing", "man 7 glob", "man -7 glob"], correctAnswer: "man 7 glob", explanation: "" },
  { id: 2794, text: "Question ID 470 Which command performs globbing?", type: "single", options: ["The ls command", "The echo command", "The bash command", "The display command"], correctAnswer: "The bash command", explanation: "" },
  { id: 2795, text: "Question ID 471 Which of the following will match files that have the string “hello” somewhere in the file name?", type: "single", options: ["echo hello*hello", "echo hello*", "echo *hello*", "echo *hello"], correctAnswer: "echo *hello*", explanation: "" },
  { id: 2796, text: "Question ID 472 The glob pattern [a-d] would match:", type: "single", options: ["A file name with a single character that is either an a , - , or d .", "Nothing, this is an invalid glob pattern.", "“ ” “ “ “ ” A file name with a single character that is either a a , b , c , or d . “ ” “ ” “ ” “ ”", "All files"], correctAnswer: "“ ” “ “ “ ” A file name with a single character that is either a a , b , c , or d . “ ” “ ” “ ” “ ”", explanation: "" },
  { id: 2797, text: "Question ID 473 The glob pattern [!abc]*", type: "single", options: ["Nothing, this is an invalid glob pattern", "All files that start with any character except a , b or c “ ” “ ” “ ”", "All files", "All files that start with either of the following characters: ! , a , b or c ."], correctAnswer: "All files that start with any character except a , b or c “ ” “ ” “ ”", explanation: "" },
  { id: 2798, text: "Question ID 894 “ ” “ ” “ ” “ ” Which glob character matches “exactly one character”?", type: "single", options: ["?", "*", ".", "["], correctAnswer: "?", explanation: "" },
  { id: 2799, text: "Question ID 895 Which glob character matches “zero or more characters”?", type: "single", options: [".", "?", "*", "["], correctAnswer: "*", explanation: "" },
  { id: 2800, text: "Question ID 896 Which two characters match “a single character from a set of specified characters”?", type: "single", options: ["[]", "..", "**", "??"], correctAnswer: "[]", explanation: "" },
  { id: 2801, text: "Question ID 897 Which two characters represent the empty string?", type: "single", options: ["**", "&&", "..", "“”"], correctAnswer: "“”", explanation: "" },
  { id: 2802, text: "Question ID 537 Which of the following are advantages of using the locate command?", type: "single", options: ["It is quicker than the find command", "Its results are always the most up to date", "It pages the results", "It can search by file attribute types"], correctAnswer: "It is quicker than the find command", explanation: "" },
  { id: 2803, text: "Question ID 538 Which of the following are advantages of using the find command? (choose two)", type: "multiple", options: ["It can search by file attribute types", "It is quicker than the locate command", "Its results are always the most up-to-date", "It pages the results"], correctAnswer: ["It can search by file attribute types", "Its results are always the most up-to-date"], explanation: "" },
  { id: 2804, text: "Question ID 541 Which option to the find command will search by name using a case-sensitive match?", type: "single", options: ["-mmin", "-iname", "-cmin", "-inum"], correctAnswer: "-iname", explanation: "" },
  { id: 2805, text: "Question ID 774 The FHS sets which standard?", type: "single", options: ["Which directories should be used to hold specific files", "Which partitions should be created", "Which filesystem types should be used", "Which services should be installed"], correctAnswer: "Which directories should be used to hold specific files", explanation: "" },
  { id: 2806, text: "Question ID 781 What directory is used as a temporary mount point?", type: "single", options: ["/xbin", "/mnt", "/tmpmnt", "/etc"], correctAnswer: "/mnt", explanation: "" },
  { id: 2807, text: "Question ID 783 Which directory is used to store files representing attached devices?", type: "single", options: ["/tmp", "/", "/dev", "/mnt"], correctAnswer: "/dev", explanation: "" },
  { id: 2808, text: "Question ID 899 The _____ command will search for files using a database of all files, which is generated daily.", type: "single", options: ["find", "locate", "search", "updatedb"], correctAnswer: "locate", explanation: "" },
  { id: 2809, text: "Question ID 901 The _____ command will search for files by searching the live filesystem.", type: "single", options: ["find", "locate", "search", "updatedb"], correctAnswer: "find", explanation: "" },
  { id: 2810, text: "Question ID 903 Which option to the locate command will have the command perform case-insensitive searches?", type: "single", options: ["-I", "-g", "-i", "-s"], correctAnswer: "-i", explanation: "" },
  { id: 2811, text: "Question ID 904 Which option to the find command will search by user owner?", type: "single", options: ["-user", "-person", "-owner", "-uowner"], correctAnswer: "-user", explanation: "" },
  { id: 2812, text: "Question ID 905 Which option to the find command will search by file type?", type: "single", options: ["-type", "-fstype", "-ftype", "-file"], correctAnswer: "-type", explanation: "" },
  { id: 2813, text: "Question ID 906 Which option to the find command will display a “long listing” of matching files?", type: "single", options: ["-ok", "-exec", "-print", "-ls"], correctAnswer: "-ls", explanation: "" },
  { id: 2814, text: "Question ID 907 Which option to the find command will execute a command on each matching file without prompting the user?", type: "single", options: ["-exec", "-ok", "-ls", "-print"], correctAnswer: "-exec", explanation: "" },
  { id: 2815, text: "Question ID 908 Which option to the find command will prompt the user to execute a command on each matching file?", type: "single", options: ["-print", "-ok", "-ls", "-exec"], correctAnswer: "-ok", explanation: "" },
  { id: 2816, text: "Question ID 909 Which option to the find command will search by name using a case-insensitive match?", type: "single", options: ["-iname", "-inum", "-insen", "-i"], correctAnswer: "-iname", explanation: "" },
  { id: 2817, text: "Question ID 979 Which directory represents the root of the primary filesystem hierarchy?", type: "single", options: ["/var", "/", "/etc", "/root"], correctAnswer: "/", explanation: "" },
  { id: 2818, text: "Question ID 980 Which directory is used to store user home directories?", type: "single", options: ["/homedir", "/home", "/usr", "/tmp"], correctAnswer: "/home", explanation: "" },
  { id: 2819, text: "Question ID 981 Which directory is used to store the kernel?", type: "single", options: ["/kernel", "/etc", "/boot", "/"], correctAnswer: "/boot", explanation: "" },
  { id: 2820, text: "Question ID 982 Which directory is used to store temporary files?", type: "single", options: ["/temp", "/tmp", "/etc", "/"], correctAnswer: "/temp", explanation: "" },
  { id: 2821, text: "Question ID 983 Which directory is used to store essential libraries?", type: "single", options: ["/usr", "/bin", "/var", "/lib"], correctAnswer: "/lib", explanation: "" },
  { id: 2822, text: "Question ID 984 Which directory is used to store configuration files specific to the host?", type: "single", options: ["/etc", "/", "/boot", "/var"], correctAnswer: "/etc", explanation: "" },
  { id: 2823, text: "Question ID 985 Which directory is used for the home directory of the root user?", type: "single", options: ["/var", "/", "/root", "/home/root"], correctAnswer: "/root", explanation: "" },
  { id: 2824, text: "Question ID 569 Which regular expression character matches any one character?", type: "single", options: [".", "?", "+", "*"], correctAnswer: ".", explanation: "" },
  { id: 2825, text: "Question ID 570 Which regular expression character matches zero or more of the previous character?", type: "single", options: ["?", "+", "*", "."], correctAnswer: "*", explanation: "" },
  { id: 2826, text: "Question ID 571 Which regular expression character matches one or more of the previous character?", type: "single", options: ["$", "–*", "+"], correctAnswer: "+", explanation: "" },
  { id: 2827, text: "Question ID 572 Which of the following regular expression characters is an extended regular expression character?", type: "single", options: ["+", ".", "$", "*"], correctAnswer: "+", explanation: "" },
  { id: 2828, text: "Question ID 573 What does “|” do in a regular expression?", type: "single", options: ["Redirects input to the command", "Redirects output from the command", "Separates repetition modifiers", "Separates alternative patterns that can be matches"], correctAnswer: "Separates alternative patterns that can be matches", explanation: "" },
  { id: 2829, text: "Question ID 574 The regular expression a? is equivalent to:", type: "single", options: ["a{0,1}", "a{1}", "a{1,}", "a{0,}"], correctAnswer: "a{0,1}", explanation: "" },
  { id: 2830, text: "Question ID 575 The regular expression a* is equivalent to:", type: "single", options: ["a{0,1}", "a{1,}", "a{0,}", "a{1}"], correctAnswer: "a{0,}", explanation: "" },
  { id: 2831, text: "Question ID 576 The regular expression a+ is equivalent to:", type: "single", options: ["a{1}", "a{1,}", "a{0,}", "a{0,1}"], correctAnswer: "a{1,}", explanation: "" },
  { id: 2832, text: "Question ID 577 To use extended regular expressions, you can use: (choose two)", type: "multiple", options: ["grep -e", "fgrep", "egrep", "grep -E"], correctAnswer: ["egrep", "grep -E"], explanation: "" },
  { id: 2833, text: "Question ID 578 To use regular expression characters to match themselves, you cannot:", type: "single", options: ["Put the character in the square brackets", "Use the fgrep command", "Use the slash in front of the character", "Use the backslash in front of the character"], correctAnswer: "Use the slash in front of the character", explanation: "" },
  { id: 2834, text: "Question ID 579 What is NOT a purpose of using parentheses around parts of a regular expression?", type: "single", options: ["They can be used to make alternation more efficient", "They can be used to refer back to what was matched", "They can be used to group characters for repetition", "They can be used to change the order that the pattern is evaluating"], correctAnswer: "They can be used to change the order that the pattern is evaluating", explanation: "" },
  { id: 2835, text: "Question ID 581 Which option for grep will invert the pattern matching results?", type: "single", options: ["-i", "-v", "-r", "-o"], correctAnswer: "-v", explanation: "" },
  { id: 2836, text: "Question ID 582 If you want to use grep without regard to the capitalization of text, you can use the option:", type: "single", options: ["-t", "-v", "-i", "-r"], correctAnswer: "-i", explanation: "" },
  { id: 2837, text: "Question ID 584 To move forward one word at a time in the vi command mode, you press:", type: "single", options: ["f", "t", "g", "w"], correctAnswer: "w", explanation: "" },
  { id: 2838, text: "Question ID 585 To go to the beginning of a line in the vi command mode, you press:", type: "single", options: ["g", "$", "^", "1"], correctAnswer: "^", explanation: "" },
  { id: 2839, text: "Question ID 586 To go to the first line of a vi document in command mode, you can type: (choose two)", type: "multiple", options: ["G", "GG", "1G", "gg"], correctAnswer: ["1G", "gg"], explanation: "" },
  { id: 2840, text: "Question ID 587 To navigate to the end of the line in vi command mode, you can press:", type: "single", options: ["#", "^", "$", "*"], correctAnswer: "$", explanation: "" },
  { id: 2841, text: "Question ID 588 To move backward through a vi document, word by word, you press:", type: "single", options: ["w", "b", "r", "c"], correctAnswer: "b", explanation: "" },
  { id: 2842, text: "Question ID 589 What would typing “4dh” do in vi command mode?", type: "single", options: ["Duplicate the next four characters", "Delete the previous four characters", "Delete the next four lines", "Delete the next four characters"], correctAnswer: "Delete the previous four characters", explanation: "" },
  { id: 2843, text: "Question ID 590 Typing which of the following from vi command mode will attempt to save your file?", type: "single", options: [":w", ":s", ":f", ":r"], correctAnswer: ":w", explanation: "" },
  { id: 2844, text: "Question ID 591 If you want to quit the vi program without saving any of the changes you made to your file, you can type in command mode:", type: "single", options: [":a", ":Q", ":s", ":q!"], correctAnswer: ":q!", explanation: "" },
  { id: 2845, text: "Question ID 592 To save and then quit, you can type in command mode:", type: "single", options: [":wq", ":q", ":qw", ":WQ"], correctAnswer: ":wq", explanation: "" },
  { id: 2846, text: "Question ID 593 To search forward from your cursor in your vi document in command mode, you can type __ followed by the pattern to search for.", type: "single", options: ["/", "|", "?"], correctAnswer: "/", explanation: "" },
  { id: 2847, text: "Question ID 594 To search backward from your cursor in your vi document in command mode, you can type __ followed by the pattern to search for.", type: "single", options: ["?", "/", "|"], correctAnswer: "?", explanation: "" },
  { id: 2848, text: "Question ID 595 To perform cut and paste in a vi document, you actually do:", type: "single", options: ["delete and put", "yank and put", "yank and paste", "delete and yank"], correctAnswer: "delete and put", explanation: "" },
  { id: 2849, text: "Question ID 596 If you are in the vi command mode and want to begin inserting text before your cursor, you can type:", type: "single", options: ["A", "i", "o", "O"], correctAnswer: "i", explanation: "" },
  { id: 2850, text: "Question ID 597 If you are in vi command mode and want to begin inserting text at the end of the line, you can type:", type: "single", options: ["o", "I", "O", "A"], correctAnswer: "A", explanation: "" },
  { id: 2851, text: "Question ID 598 If you are in the vi command mode and want to add a new line before your cursor, you can type:", type: "single", options: ["i", "o", "O", "a"], correctAnswer: "O", explanation: "" },
  { id: 2852, text: "Question ID 599 If you are in vi command mode and want to add a new line after your cursor, you can type:", type: "single", options: ["o", "O", "i", "a"], correctAnswer: "o", explanation: "" },
  { id: 2853, text: "Question ID 600 If you want to move a character to the left in vi command mode, you can press the left arrow key or:", type: "single", options: ["l", "h", "j", "k"], correctAnswer: "h", explanation: "" },
  { id: 2854, text: "Question ID 601 If you want to move a character to the right in vi command mode, you can press the right arrow key or:", type: "single", options: ["l", "k", "j", "h"], correctAnswer: "l", explanation: "" },
  { id: 2855, text: "Question ID 602 If you want to move up a line in vi command mode, you can press the up arrow key or:", type: "single", options: ["j", "h", "l", "k"], correctAnswer: "k", explanation: "" },
  { id: 2856, text: "Question ID 603 If you want to move down a line in vi command mode, you can press the down arrow key or:", type: "single", options: ["l", "j", "h", "k"], correctAnswer: "j", explanation: "" },
  { id: 2857, text: "Question ID 545 This stream is the output of a command operating normally:", type: "single", options: ["stdout", "stderr", "stdin", "stdnorm"], correctAnswer: "stdout", explanation: "" },
  { id: 2858, text: "Question ID 546 Many commands that read text files will also read from this stream:", type: "single", options: ["pipe", "stdin", "redirect", "input"], correctAnswer: "stdin", explanation: "" },
  { id: 2859, text: "Question ID 547 If you want to overwrite a file by redirecting the output of a command, you can use:", type: "single", options: ["&", ">", "}", "|"], correctAnswer: ">", explanation: "" },
  { id: 2860, text: "Question ID 548 To redirect the errors that are output by a command, you can use:", type: "single", options: ["@", "2>", "2@", "2&"], correctAnswer: "2>", explanation: "" },
  { id: 2861, text: "Question ID 549 Two or more commands combined with the “|” between them form a:", type: "single", options: ["convoy", "caravan", "command line", "pipeline"], correctAnswer: "pipeline", explanation: "" },
  { id: 2862, text: "Question ID 550 Which two symbols can effectively redirect stdin to a command? (choose two)", type: "multiple", options: [">", "!", "|", "<"], correctAnswer: ["|", "<"], explanation: "" },
  { id: 2863, text: "Question ID 551 If you want to append a file with the normal output of a command, you can use:", type: "single", options: ["2>>", ">", ">>", "1>"], correctAnswer: ">>", explanation: "" },
  { id: 2864, text: "Question ID 552 To send the normal and error output of a command to a single file, you can use:", type: "single", options: ["2>", ">", "1>", "&>"], correctAnswer: "&>", explanation: "" },
  { id: 2865, text: "Question ID 910 Which of the following commands will take the standard output of the ls and put it into the /tmp/output.txt file:", type: "single", options: ["ls 2 | /tmp/output", "ls 2> /tmp/output.txt", "ls > /tmp/output.txt", "ls | /tmp/output.txt"], correctAnswer: "ls > /tmp/output.txt", explanation: "" },
  { id: 2866, text: "Question ID 911 Which of the following commands will take the standard error of the ls command and put it into the /tmp/output.txt file:", type: "single", options: ["ls 2> /tmp/output.txt", "ls | /tmp/output.txt", "ls 2 | /tmp/output", "ls > /tmp/output.txt"], correctAnswer: "ls 2> /tmp/output.txt", explanation: "" },
  { id: 2867, text: "Question ID 426 To execute a command called “simple” as a foreground process, you would type:", type: "single", options: ["fg simple", "simple &", "foreground simple", "simple"], correctAnswer: "simple", explanation: "" },
  { id: 2868, text: "Question ID 427 The key press combination that will request a process to stop is:", type: "single", options: ["CTRL+z", "CTRL+p", "CTRL+c", "CTRL+d"], correctAnswer: "CTRL+z", explanation: "" },
  { id: 2869, text: "Question ID 428 The key press combination that will request a running process terminate:", type: "single", options: ["CTRL+z", "CTRL+d", "CTRL+p", "CTRL+c"], correctAnswer: "CTRL+c", explanation: "" },
  { id: 2870, text: "Question ID 429 The main advantage of running a process in the background is:", type: "single", options: ["The process will automatically run at a low priority", "You can be assured that the process will not terminate early", "The process will be logged", "You can continue to use the shell that started the process"], correctAnswer: "You can continue to use the shell that started the process", explanation: "" },
  { id: 2871, text: "Question ID 430 To see the list of background processes that you have started in your shell, you can run:", type: "single", options: ["process", "jobs", "work", "list"], correctAnswer: "jobs", explanation: "" },
  { id: 2872, text: "Question ID 431 Using the kill command always terminates processes. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2873, text: "Question ID 432 To view all processes on the system, you can execute:", type: "single", options: ["ps all", "ps", "ps -–f", "ps -e"], correctAnswer: "ps -e", explanation: "" },
  { id: 2874, text: "Question ID 433 In order to run a command called “tough” in the background, you would type:", type: "single", options: ["start -b tough", "tough&", "tough@", "bg tough"], correctAnswer: "tough&", explanation: "" },
  { id: 2875, text: "Question ID 434 If you want a background process to keep running after log out, you can use:", type: "single", options: ["nokill", "nohup", "nofg", "bg"], correctAnswer: "nohup", explanation: "" },
  { id: 2876, text: "Question ID 435 A popular program for monitoring running processes in real-time is:", type: "single", options: ["watcher", "mon", "top", "ghost"], correctAnswer: "top", explanation: "" },
  { id: 2877, text: "Question ID 436 To view statistics on memory availability, you can use:", type: "single", options: ["mem", "stat", "free", "uname"], correctAnswer: "free", explanation: "" },
  { id: 2878, text: "Question ID 437 To send a signal to a set of processes with the same name, you can run:", type: "single", options: ["killall", "grpkill", "allkill", "sigkill"], correctAnswer: "killall", explanation: "" },
  { id: 2879, text: "Question ID 438 The uptime command prints a statistic representing the system load over what three time spans? (choose three)", type: "multiple", options: ["Last thirty minutes", "Last minute", "Last five minutes", "Last ten minutes", "Last fifteen minutes", "Last hour"], correctAnswer: ["Last minute", "Last five minutes", "Last fifteen minutes"], explanation: "" },
  { id: 2880, text: "Question ID 439 What command can be used as a prefix to another command to run it at an altered priority?", type: "single", options: ["low", "chpr", "nice", "pri"], correctAnswer: "nice", explanation: "" },
  { id: 2881, text: "Question ID 440 What command can be used to alter the priority of a running process?", type: "single", options: ["repri", "renice", "relow", "chpr"], correctAnswer: "renice", explanation: "" },
  { id: 2882, text: "Question ID 444 Placing an __ character at the end of the command line will put the command in the background.", type: "single", options: ["!", "&", "B", "?"], correctAnswer: "&", explanation: "" },
  { id: 2883, text: "Question ID 445 A signal is:", type: "single", options: ["A technique to tell a process to take some sort of action", "A command option", "A technique to send data to a process", "A command argument"], correctAnswer: "A technique to tell a process to take some sort of action", explanation: "" },
  { id: 2884, text: "Question ID 447 Which of the following is not a valid way to send the “force kill” signal to a process?", type: "single", options: ["kill -KILL PID", "kill -SIGKILL PID", "kill -9 PID", "kill -FORCE PID"], correctAnswer: "kill -FORCE PID", explanation: "" },
  { id: 2885, text: "Question ID 448 Which of the following commands will stop all processes owned by the user bob? (choose two)", type: "multiple", options: ["killall -u bob", "pkill -u bob", "kill -u bob", "kill -l"], correctAnswer: ["killall -u bob", "pkill -u bob"], explanation: "" },
  { id: 2886, text: "Question ID 449 To execute a command with the lowest possible priority, which value do you pass to the nice command?", type: "single", options: ["0", "20", "-20", "19"], correctAnswer: "19", explanation: "" },
  { id: 2887, text: "Question ID 450 To execute a command with the highest possible priority, which value do you pass to the nice command?", type: "single", options: ["-20", "19", "0", "20"], correctAnswer: "-20", explanation: "" },
  { id: 2888, text: "Question ID 451 To execute a command with the default priority, which value do you pass to the nice command?", type: "single", options: ["-20", "20", "19", "0"], correctAnswer: "0", explanation: "" },
  { id: 2889, text: "Question ID 886 The _____ command will list the commands that are running in your terminal.", type: "single", options: ["list", "ps", "proc", "ls"], correctAnswer: "ps", explanation: "" },
  { id: 2890, text: "Question ID 887 To change the niceness value of an existing process, you can use the _____ command.", type: "single", options: ["renice", "set", "reset", "nice"], correctAnswer: "renice", explanation: "" },
  { id: 2891, text: "Question ID 888 To see how long the system has been running, you can use the _____ command.", type: "single", options: ["free", "nice", "uptime", "ps"], correctAnswer: "uptime", explanation: "" },
  { id: 2892, text: "Question ID 889 To send a paused process to the background, use the _____ command.", type: "single", options: ["fg", "ps", "bg", "jobs"], correctAnswer: "bg", explanation: "" },
  { id: 2893, text: "Question ID 890 To set a priority value lower than 0, you must log in as which user?", type: "single", options: ["Any user account", "No user can specify a priority lower than 0", "The root user", "The adm user"], correctAnswer: "The root user", explanation: "" },
  { id: 2894, text: "Question ID 891 To view system memory usage, you can use the _____ command.", type: "single", options: ["uptime", "nice", "free", "ps"], correctAnswer: "free", explanation: "" },
  { id: 2895, text: "Question ID 892 What character do you place between commands to execute multiple commands on a single command line?", type: "single", options: [";", "&", ":", "~"], correctAnswer: ";", explanation: "" },
  { id: 2896, text: "Question ID 893 What option to the kill command will list the signals for the system?", type: "single", options: ["-9", "-list", "-l", "-r"], correctAnswer: "-l", explanation: "" },
  { id: 2897, text: "Question ID 503 Which archiving method is compatible across Linux, Microsoft Windows and Mac operating systems?", type: "single", options: ["cpio", "dd", "zip", "tar"], correctAnswer: "zip", explanation: "" },
  { id: 2898, text: "Question ID 504 Which option to the zip command can be used to recursively compress multiple directories?", type: "single", options: ["-r", "-R", "-l", "-d"], correctAnswer: "-r", explanation: "" },
  { id: 2899, text: "Question ID 505 Which option to the zip command will list its files without uncompressing them?", type: "single", options: ["-R", "-l", "-c", "-F"], correctAnswer: "-l", explanation: "" },
  { id: 2900, text: "Question ID 506 The unzip command can be used without options to extract files from a zip archive. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2901, text: "Question ID 509 Which option to the gzip command can be used to retain the uncompressed files when creating an archive?", type: "single", options: ["-R", "-F", "No option needed, gzip does this by default", "-c"], correctAnswer: "-c", explanation: "" },
  { id: 2902, text: "Question ID 510 Which option to the unzip command can be used to estimate the size of an archive when it is decompressed?", type: "single", options: ["-l", "-c", "-R", "-F"], correctAnswer: "-l", explanation: "" },
  { id: 2903, text: "Question ID 511 It is not possible to recursively compress files within directories with gzip. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2904, text: "Question ID 512 To decompress the archive example.gz, use the following command:", type: "single", options: ["gunzip example.gz", "gunzip -x example.gz", "gzip -u example.gz", "gzip -x example.gz"], correctAnswer: "gunzip example.gz", explanation: "" },
  { id: 2905, text: "Question ID 513 gzip and bzip are aliases for the same utility. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2906, text: "Question ID 514 bzip2 archives are typically indicated with which file extension?", type: "single", options: [".bz", ".bz2", ".b2", ".gz"], correctAnswer: ".bz2", explanation: "" },
  { id: 2907, text: "Question ID 515 Which option to the bzip2 command can be used to report the compression ratio of an archive?", type: "single", options: ["-l", "-R", "-v", "-c"], correctAnswer: "-v", explanation: "" },
  { id: 2908, text: "Question ID 516 Which option to the bzip2 command can be used for recursive compression?", type: "single", options: ["-v", "bzip2 doesnt support recursive compression", "-c", "-R"], correctAnswer: "bzip2 doesnt support recursive compression", explanation: "" },
  { id: 2909, text: "Question ID 517 gzip and bzip2 use the same compression algorithm. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2910, text: "Question ID 518 Which of the following functions is not a primary use of the tar command:", type: "single", options: ["Extract archives", "View archives", "Create archives", "Repair corrupted archives"], correctAnswer: "Repair corrupted archives", explanation: "" },
  { id: 2911, text: "Question ID 519 The tar command supports which of the following styles of option(s)? (choose three)", type: "multiple", options: ["DOS", "GNU", "BSD", "Unix"], correctAnswer: ["GNU", "BSD", "Unix"], explanation: "" },
  { id: 2912, text: "Question ID 520 The tar command supports:", type: "single", options: ["gzip compression only", "bzip compression only", "Both gzip and bzip2 compression", "only uncompressed archives"], correctAnswer: "Both gzip and bzip2 compression", explanation: "" },
  { id: 2913, text: "Question ID 521 Which of the following commands could be used to extract the archive, example.tar?", type: "single", options: ["tar -uz example.tar", "tar -xz example.tar", "tar -xf example.tar", "tar -uf example.tar"], correctAnswer: "tar -xf example.tar", explanation: "" },
  { id: 2914, text: "Question ID 522 By default, tar will attempt to extract an archive…", type: "single", options: ["into the working directory.", "to the specified directory.", "into the archives parent directory.", "into the users home directory."], correctAnswer: "into the working directory.", explanation: "" },
  { id: 2915, text: "Question ID 523  The cpio command has four modes of operation. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2916, text: "Question ID 524 Which of the following options puts the cpio command in copy-out mode?", type: "single", options: ["-v", "-u", "-o", "-i"], correctAnswer: "-o", explanation: "" },
  { id: 2917, text: "Question ID 525 Which of the following options puts the cpio command into copy-in mode?", type: "single", options: ["-i", "-u", "-o", "-v"], correctAnswer: "-i", explanation: "" },
  { id: 2918, text: "Question ID 526 Which of the following options allows the cpio command to overwrite existing files?", type: "single", options: ["-u", "-v", "-o", "-i"], correctAnswer: "-u", explanation: "" },
  { id: 2919, text: "Question ID 527 The cpio command will preserve metadata when copying files. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2920, text: "Question ID 528 When copying entire devices using the dd command, you must specify:", type: "single", options: ["block size and count only", "input file and output file only", "input file, output file, and block count", "input file, output file, block size and count"], correctAnswer: "input file and output file only", explanation: "" },
  { id: 2921, text: "Question ID 529 The dd command can be used to create iso files. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2922, text: "Question ID 530 The dd command can be used to create large files the can be used as swap files. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2923, text: "Question ID 531 The dd command can be used to copy entire partitions. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2924, text: "Question ID 532 Which of the following is not a valid argument for the dd command?", type: "single", options: ["count", "in", "if", "bs", "of"], correctAnswer: "in", explanation: "" },
  { id: 2925, text: "Question ID 604 Which command can be used to set what your default permissions will be on new files?", type: "single", options: ["umode", "umask", "mode", "mask"], correctAnswer: "umask", explanation: "" },
  { id: 2926, text: "Question ID 605 Which commands can be used to change the ownership of a file? (choose two)", type: "multiple", options: ["chggrp", "chgrp", "chown", "newgrp"], correctAnswer: ["chgrp", "chown"], explanation: "" },
  { id: 2927, text: "Question ID 606 If a file has permissions that appear as rwxr-x—, what is the octal permission mode of the file?", type: "single", options: ["760", "650", "750", "740"], correctAnswer: "750", explanation: "" },
  { id: 2928, text: "Question ID 607 Which permission is necessary on a directory in order for a user to use the cd command to change that directory?", type: "single", options: ["Read", "None", "Execute", "Write"], correctAnswer: "Execute", explanation: "" },
  { id: 2929, text: "Question ID 608 The only user with the capability to change the owner of a file is root. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2930, text: "Question ID 609 The setuid permission on a file:", type: "single", options: ["Causes the file to always run as root", "Causes the file to never run as root", "Causes the file to run under the owners identity", "Causes the file to run under the users identity"], correctAnswer: "Causes the file to run under the owners identity", explanation: "" },
  { id: 2931, text: "Question ID 610  Using the setgid permission on a directory:", type: "single", options: ["Causes new files created in the directory to be owned by the group that owns the directory", "Causes the directory to be writable to members of the group that owns the directory", "Causes files existing in the directory to be made executable by the group", "Causes files existing in the directory to be owned by the group that owns the directory"], correctAnswer: "Causes new files created in the directory to be owned by the group that owns the directory", explanation: "" },
  { id: 2932, text: "Question ID 611 Which permission is used to make a directory so that only root, the owners of files or the owner of the directory can remove them?", type: "single", options: ["sticky bit", "setgid", "write", "setuid"], correctAnswer: "setgid", explanation: "" },
  { id: 2933, text: "Question ID 612 Which command is used to change permissions on a file?", type: "single", options: ["chgmode", "chmod", "chgperm", "chperm"], correctAnswer: "chmod", explanation: "" },
  { id: 2934, text: "Question ID 613 To access a directory with the cd command, you must also be able to access all the parent directories of the directory with the cd command. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2935, text: "Question ID 614 Which command can change the user owner of a file?", type: "single", options: ["chown", "own", "pawn", "chpawn"], correctAnswer: "chown", explanation: "" },
  { id: 2936, text: "Question ID 615 To run binary executables, you need both read and execute permission. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2937, text: "Question ID 616 To run a script file, you need both read and execute permission. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2938, text: "Question ID 617 Assuming everyone has access to the directory the file is in, who can view the contents of a file with permissions of rw-r—-x?", type: "single", options: ["Nobody", "Both the user owner and group owners", "Only the user owner", "Everyone", "Only the group owners"], correctAnswer: "Both the user owner and group owners", explanation: "" },
  { id: 2939, text: "Question ID 619 To switch to another group, you must:", type: "single", options: ["Be a member of the group that you are switching to", "Be logged in graphically", "Log off and log back in", "Log in as the staff user"], correctAnswer: "Be a member of the group that you are switching to", explanation: "" },
  { id: 2940, text: "Question ID 620 Which command will allow you to change the group ownership of a file that you own?", type: "single", options: ["regroup", "chgrp", "chown", "mask"], correctAnswer: "chgrp", explanation: "" },
  { id: 2941, text: "Question ID 621 The group ownership of a file may only be changed by:", type: "single", options: ["The owner of the file", "Any user can change the group ownership of any file", "The root user", "Both the root user and the owner of the file"], correctAnswer: "Both the root user and the owner of the file", explanation: "" },
  { id: 2942, text: "Question ID 622 The only person who can change the user ownership of a file is:", type: "single", options: ["The root user", "The owner of the file", "Both the root user and owner of the file", "Any user can change the group ownership of any file"], correctAnswer: "The root user", explanation: "" },
  { id: 2943, text: "Question ID 623 For the rwxr-x–x permission set, the bolded permissions belong to:", type: "single", options: ["All users besides the user owner and group owner", "The group owner of the file", "The user owner and group owner of the file", "The user owner of the file"], correctAnswer: "The user owner of the file", explanation: "" },
  { id: 2944, text: "Question ID 624 For rwxr-x–x permission set, the bolded permissions belong to:", type: "single", options: ["The user owner and group owner of the file", "All users besides the user owner and group owner", "The user owner of the file", "The group owner of the file"], correctAnswer: "All users besides the user owner and group owner", explanation: "" },
  { id: 2945, text: "Question ID 625 For the rwxr-x–x permission set, the bolded permissions belong to:", type: "single", options: ["The group owner of the file", "All users besides the user owner and group owner", "The user owner and group owner of the file", "The user owner of the file"], correctAnswer: "The group owner of the file", explanation: "" },
  { id: 2946, text: "Question ID 626 The command, chmod a+x will:", type: "single", options: ["Remove execute permission for all users", "Add execute permissions for the user owner", "Remove execute permissions for the user owner", "Add execute permission for all users"], correctAnswer: "Add execute permission for all users", explanation: "" },
  { id: 2947, text: "Question ID 627 The command, chmod u=g will:", type: "single", options: ["Set the group owners permissions to match the user owners permissions", "Set the user owners permissions to match the group owners permission", "Nothing, the command syntax is invalid", "Set the user owners permissions to rwx"], correctAnswer: "Set the user owners permissions to match the group owners permission", explanation: "" },
  { id: 2948, text: "Question ID 628 To have permissions set to rwxr-x–x, you can use the following command:", type: "single", options: ["chmod 751", "chmod 755", "chmod 777 file", "chmod 711"], correctAnswer: "chmod 751", explanation: "" },
  { id: 2949, text: "Question ID 629 The command, chmod 1777 /data will:", type: "single", options: ["Make the /data directory a setuid directory", "Make the /data directory a sticky bit directory", "Remove all special permissions", "Make the /data directory a setgid directory"], correctAnswer: "Make the /data directory a sticky bit directory", explanation: "" },
  { id: 2950, text: "Question ID 630 The command, chmod 0777 /data will:", type: "single", options: ["Make the /data directory a setuid directory", "Make the /data directory a setgid directory", "Make the /data directory a sticky bit directory", "Remove all special permissions"], correctAnswer: "Remove all special permissions", explanation: "" },
  { id: 2951, text: "Question ID 632 The command, chmod 2777 /data will:", type: "single", options: ["Make the /data directory a setgid directory", "Make the /data directory a sticky bit directory", "Make the /data directory a setuid directory", "Remove all special permissions"], correctAnswer: "Make the /data directory a setgid directory", explanation: "" },
  { id: 2952, text: "Question ID 912 Which command will allow you to switch to another group and add files that are group owned by this other group?", type: "single", options: ["chgrp", "switchgrp", "newgroup", "newgrp"], correctAnswer: "newgrp", explanation: "" },
  { id: 2953, text: "Question ID 913 What umask value would you use in order for new directories to have the permissions of rwxr-x x? –", type: "single", options: ["027", "077", "022", "026"], correctAnswer: "026", explanation: "" },
  { id: 2954, text: "Question ID 754 Which are valid link types in Linux? (choose two)", type: "multiple", options: ["Filesystem links", "Stable links", "Hard links", "Soft links"], correctAnswer: ["Hard links", "Soft links"], explanation: "" },
  { id: 2955, text: "Question ID 755 The output of the ls -l command includes /etc/grub.conf -> ../boot/grub/grub.conf . Based on this information, which is the soft link file?", type: "single", options: ["../boot/grub/grub.conf “ ”", "Both", "Neither", "/etc/grub.conf"], correctAnswer: "/etc/grub.conf", explanation: "" },
  { id: 2956, text: "Question ID 757 Which of the following commands will create a soft link from the /tmp/test file to the /tmp/data file?", type: "single", options: ["ln /tmp/test /tmp/data", "ln /tmp/data /tmp/test", "ln -s /tmp/test /tmp/data", "ln -s /tmp/data /tmp/test"], correctAnswer: "ln -s /tmp/test /tmp/data", explanation: "" },
  { id: 2957, text: "Question ID 758 Which of the following commands will create a hard link from the /tmp/test file to the /tmp/data file?", type: "single", options: ["ln -s /tmp/data /tmp/test", "ln /tmp/data /tmp/test", "ln /tmp/test /tmp/data", "ln -s /tmp/test /tmp/data"], correctAnswer: "ln /tmp/test /tmp/data", explanation: "" },
  { id: 2958, text: "Question ID 760 What permissions are typically placed on soft link files?", type: "single", options: ["rw-rw-rw-", "——— rwxrwxrwx", "rwx"], correctAnswer: "——— rwxrwxrwx", explanation: "" },
  { id: 2959, text: "Question ID 761 When you c—re—ate a soft link, it increases the hard link count by one. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2960, text: "Question ID 762 When you create a hard link, it increases the hard link count by one. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2961, text: "Question ID 763 Which is true about hard links?", type: "single", options: ["They are created with the ln -s command", "They share inodes", "They can only be created by the root user", "They can be made to directories"], correctAnswer: "They share inodes", explanation: "" },
  { id: 2962, text: "Question ID 765 What option to the find command allows you to search for files by inode numbers?", type: "single", options: ["-links", "-ipath", "-inum", "-mtime"], correctAnswer: "-inum", explanation: "" },
  { id: 2963, text: "Question ID 766 If you have 5 hard linked files and you delete four of them including the original one, then:", type: "single", options: ["The file still exists, but the data in the file is deleted", "You lose the data from the file", "The hard link count goes to 0", "The data is still available from the remaining file"], correctAnswer: "The data is still available from the remaining file", explanation: "" },
  { id: 2964, text: "Question ID 771 If you have a file named /tmp/hosts pointing to a file named /etc/hosts and the /etc/hosts file is deleted, then which of the following statements is true?", type: "single", options: ["The /tmp/hosts file now points to nothing", "You can still access the data by using /tmp/hosts", "The data from /etc/hosts is automatically copied into /tmp/hosts before /etc/hosts is deleted", "It is not possible to delete the /etc/hosts file while a soft link is pointing to it"], correctAnswer: "The /tmp/hosts file now points to nothing", explanation: "" },
  { id: 2965, text: "Question ID 772 Which value represents the inode number in the following output of the ls -li command: 87589 -rw-r r . 2 root root 83 Mar 4 22:45 myhosts", type: "single", options: ["22:45", "83 – –", "2", "87589"], correctAnswer: "87589", explanation: "" },
  { id: 2966, text: "Question ID 773 Which value represents the hard link count in the following output of the ls -li command: 87589 -rw-r r . 2 root root 83 Mar 4 22:45 myhosts", type: "single", options: ["87589", "– – 2", "22:45", "83"], correctAnswer: "– – 2", explanation: "" },
  { id: 2967, text: "Question ID 972 A soft link is also called a _____ link.", type: "single", options: ["symbolic", "indirect", "true", "false"], correctAnswer: "symbolic", explanation: "" },
  { id: 2968, text: "Question ID 973 Which type of link can be made to a file on another filesystem, hard or soft?", type: "single", options: ["soft", "hard"], correctAnswer: "soft", explanation: "" },
  { id: 2969, text: "Question ID 974 Which type of link can be made to directories, hard or soft?", type: "single", options: ["hard", "soft"], correctAnswer: "soft", explanation: "" },
  { id: 2970, text: "Question ID 975 Which type of link is easier to visually see , hard or soft?", type: "single", options: ["hard", "“ ” soft"], correctAnswer: "“ ” soft", explanation: "" },
  { id: 2971, text: "Question ID 976 Which type of link is indistinguishable by programs from regular files, hard or soft?", type: "single", options: ["soft", "hard"], correctAnswer: "hard", explanation: "" },
  { id: 2972, text: "Question ID 977 Which option to the ls command displays the inode numbers of files?", type: "single", options: ["-inum", "-i", "-l", "-N"], correctAnswer: "-i", explanation: "" },
  { id: 2973, text: "Question ID 978 When viewing a file with the ls -l command, which character represents a file type of soft link?", type: "single", options: ["d", "–f", "l"], correctAnswer: "l", explanation: "" },
  { id: 2974, text: "Question ID 1033 Which of the following commands is used to view the summary of CPUs in the system?", type: "single", options: ["cpustat", "more /proc/cpuinfo", "ls -cpu", "lscpu"], correctAnswer: "lscpu", explanation: "" },
  { id: 2975, text: "Question ID 1034 What is the maximum memory that a 64 bit processor can theoretically use?", type: "single", options: ["16 EiB", "8 GiB", "2 GiB", "4 GiB"], correctAnswer: "16 EiB", explanation: "" },
  { id: 2976, text: "Question ID 1035 Which command is used to view the summary of the RAM and swap space?", type: "single", options: ["du", "lsmem", "iostat", "free"], correctAnswer: "free", explanation: "" },
  { id: 2977, text: "Question ID 1036 Which of the following is not a characteristic of firmware?", type: "single", options: ["Change settings to affect the use of external devices", "Change runlevels", "Tests the components upon startup", "Typically stored in ROM"], correctAnswer: "Change runlevels", explanation: "" },
  { id: 2978, text: "Question ID 1037 Which of the following is not a mass storage device?", type: "single", options: ["FireWire", "SATA drive", "USB", "Thunderbird"], correctAnswer: "Thunderbird", explanation: "" },
  { id: 2979, text: "Question ID 1038 Coldplug devices are devices that are connected when the power is off. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2980, text: "Question ID 1039 To use “plug and play”, which components must support hotplugging that device?", type: "single", options: ["Device Driver, Interface, Operating System", "Device, Interface, Operating System, RAM", "Device Driver, Interface, ROM", "Device Driver, USB, Operating System"], correctAnswer: "Device Driver, Interface, Operating System", explanation: "" },
  { id: 2981, text: "Question ID 1040 Which of the following resources are used by devices to communicate with the system?", type: "single", options: ["IO Channels, IO Memory, Interrupts and DMA Ports", "IO Ports, RAM, Interrupts and DMA Channels", "IO Ports, IO Memory, Interrupts, and DMA Channels", "IO Ports, IO Memory, Signals and DMA Channels"], correctAnswer: "IO Ports, IO Memory, Interrupts, and DMA Channels", explanation: "" },
  { id: 2982, text: "Question ID 1041 Interrupts cannot be shared between devices. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 2983, text: "Question ID 1042 Which of the following commands is used to view the network interface controller connected on the PCI bus?", type: "single", options: ["lsmod", "lsusb", "lspci", "lsnet"], correctAnswer: "lspci", explanation: "" },
  { id: 2984, text: "Question ID 1043 Which of the following commands is used to view the details of an external drive connected to a USB port?", type: "single", options: ["lsusb -v", "lsusb-u", "lspci -u", "lsmod -u"], correctAnswer: "lsusb -v", explanation: "" },
  { id: 2985, text: "Question ID 1044 Which option of the lspci command would you use to troubleshoot a network interface card?", type: "single", options: ["-nn", "-r", "-t", "-a"], correctAnswer: "-nn", explanation: "" },
  { id: 2986, text: "Question ID 1045 The _____ is a kernel module used by the kernel to manage hardware devices.", type: "single", options: ["Driver", "Configuration file", "Subsystem", "Interface"], correctAnswer: "Subsystem", explanation: "" },
  { id: 2987, text: "Question ID 1046 Which of the following is not a function of the udev subsystem?", type: "single", options: ["Create device node when a new device is connected", "Maintain psuedo filesystem in the /dev directory", "Remove device node when a device is removed", "Maintain log files"], correctAnswer: "Maintain log files", explanation: "" },
  { id: 2988, text: "Question ID 1047 HALD is the abbreviation for:", type: "single", options: ["Hardware Abstraction Layer Driver", "Hardware Abstraction Layer Daemon", "Hardware Availability Layer Daemon", "Hardware Attribute Layer Daemon"], correctAnswer: "Hardware Abstraction Layer Daemon", explanation: "" },
  { id: 2989, text: "Question ID 1048 What is the notification mechanism used to inform programs about a change in state of hardware devices?", type: "single", options: ["DBUS sends notifications to HALD", "HALD uses dbus to send notifications", "Programs query HALD directly", "DBUS forwards queries from programs to HALD"], correctAnswer: "HALD uses dbus to send notifications", explanation: "" },
  { id: 2990, text: "Question ID 1049 Which of the following is not true about kernel modules?", type: "single", options: ["They can be compiled into the kernel itself", "They are loaded automatically by the kernel", "They are software to support devices", "They are plug and play hardware devices"], correctAnswer: "They are plug and play hardware devices", explanation: "" },
  { id: 2991, text: "Question ID 1050 The _____ command is used to load a module along with its dependencies.", type: "single", options: ["insmod", "modprobe", "ldmod", "lsmod"], correctAnswer: "modprobe", explanation: "" },
  { id: 2992, text: "Question ID 814 The first stage of the boot process is:", type: "single", options: ["The kernel phase", "The firmware (BIOS/UEFI) stage", "The init phase", "The Bootloader (LILO/GRUB) stage"], correctAnswer: "The firmware (BIOS/UEFI) stage", explanation: "" },
  { id: 2993, text: "Question ID 815 The second stage of the boot process is:", type: "single", options: ["The firmware (BIOS/UEFI) stage", "The kernel phase", "The init phase", "The Bootloader (LILO/GRUB) stage"], correctAnswer: "The Bootloader (LILO/GRUB) stage", explanation: "" },
  { id: 2994, text: "Question ID 816 The third stage of the boot process is:", type: "single", options: ["The Bootloader (LILO/GRUB) stage", "The init phase", "The firmware (BIOS/UEFI) stage", "The kernel phase"], correctAnswer: "The kernel phase", explanation: "" },
  { id: 2995, text: "Question ID 817 The fourth stage of the boot process is:", type: "single", options: ["The Bootloader (LILO/GRUB) stage", "The kernel", "The firmware (BIOS/UEFI) stage", "The init phase"], correctAnswer: "The init phase", explanation: "" },
  { id: 2996, text: "Question ID 818 The bootloader (GRUB/LILO) loads which of the following components into memory? (choose two)", type: "multiple", options: ["The ramdisk", "The root filesystem", "The kernel", "The init process"], correctAnswer: ["The ramdisk", "The kernel"], explanation: "" },
  { id: 2997, text: "Question ID 1004 The first process that the kernel launches is called the _____ process.", type: "single", options: ["kernel", "startx", "sys", "init"], correctAnswer: "init", explanation: "" },
  { id: 2998, text: "Question ID 1005 The program that first starts the boot process is called the _____.", type: "single", options: ["start", "bootloader", "exec", "boot"], correctAnswer: "bootloader", explanation: "" },
  { id: 2999, text: "Question ID 1029 Which file is overwritten at the end of each boot process with the messages that were generated while booting?", type: "single", options: ["/var/log/dmsg", "/var/log/dmesg", "/var/tmp/dmesg", "/var/msg/dmesg"], correctAnswer: "/var/log/dmesg", explanation: "" },
  { id: 3000, text: "Question ID 1030 Which of the following is not a function of the dmesg command?", type: "single", options: ["Check how the kernel has dealt with a new device", "Alter the level of messages that the kernel prints to the console", "Add a new network interface", "View the messages generated by the kernel during boot time"], correctAnswer: "Add a new network interface", explanation: "" },
  { id: 3001, text: "Question ID 1031 Which of the following is not a daemon used for logging?", type: "single", options: ["ilogd", "klogd", "syslogd", "rsyslogd"], correctAnswer: "ilogd", explanation: "" },
  { id: 3002, text: "Question ID 1032 Which directory is used primarily for storing log messages?", type: "single", options: ["/var/logging", "/var/tmp", "/var/log", "/var/spool"], correctAnswer: "/var/log", explanation: "" },
  { id: 3003, text: "Question ID 786 Which of the following are valid Linux bootloaders? (choose two)", type: "multiple", options: ["GRUB", "BIOS", "LILO", "UEFI"], correctAnswer: ["GRUB", "LILO"], explanation: "" },
  { id: 3004, text: "Question ID 789 A primary function of a Linux bootloader is:", type: "single", options: ["To load the init process", "To configure devices", "To configure memory", "To load the kernel"], correctAnswer: "To load the kernel", explanation: "" },
  { id: 3005, text: "Question ID 790 Which bootloader includes the Secure Boot feature?", type: "single", options: ["BIOS", "UEFI", "LILO", "GRUB"], correctAnswer: "UEFI", explanation: "" },
  { id: 3006, text: "Question ID 792 Which command needs to be executed after modifying the LILO configuration file?", type: "single", options: ["lilo", "redo", "reload", "modconfig"], correctAnswer: "lilo", explanation: "" },
  { id: 3007, text: "Question ID 793 What version of GRUB is the most modern version?", type: "single", options: ["GRUB 3", "GRUB Original", "GRUB 2", "GRUB Legacy"], correctAnswer: "GRUB 2", explanation: "" },
  { id: 3008, text: "Question ID 794 For GRUB Legacy, which of the following is used to specify the second partition of the second hard drive?", type: "single", options: ["(hd2,2)", "(hd1,2)", "(hd2,1)", "(hd1,1)"], correctAnswer: "(hd1,1)", explanation: "" },
  { id: 3009, text: "Question ID 796 In GRUB Legacy, which directive is not typically used after a title directive? (choose one)", type: "single", options: ["boot", "initrd", "kernel", "root"], correctAnswer: "boot", explanation: "" },
  { id: 3010, text: "Question ID 800 In GRUB Legacy, the _____ directive indicates how long to wait before automatically booting the default operating system.", type: "single", options: ["timeout=", "fallback=", "kernel", "password="], correctAnswer: "timeout=", explanation: "" },
  { id: 3011, text: "Question ID 801 In GRUB Legacy, the _____ directive indicates an operating system to boot if the default operating system fails to boot.", type: "single", options: ["root", "redo", "timeout=", "fallback="], correctAnswer: "fallback=", explanation: "" },
  { id: 3012, text: "Question ID 802 In GRUB Legacy, the password directive in the global setting means:", type: "single", options: ["The user must submit the specified password before appending, editing or using the GRUB command line.", "The user must submit the password before GRUB will attempt to boot the title.", "You cant place a password directive in the global setting."], correctAnswer: "The user must submit the specified password before appending, editing or using the GRUB command line.", explanation: "" },
  { id: 3013, text: "Question ID 803 In GRUB Legacy, the password directive in the title directive setting means:", type: "single", options: ["To boot a specific operating system, a password must be entered", "The password must be entered to display a menu of operating systems that are bootable", "You cant place a password directive in the title directive setting", "To edit any GRUB values, a password must first be entered"], correctAnswer: "To boot a specific operating system, a password must be entered", explanation: "" },
  { id: 3014, text: "Question ID 805 Which of the following commands can be used to create an encrypted password that can be used with the password directive in GRUB Legacy:", type: "single", options: ["crypt-md5-grub", "crypt-grub", "grub-crypt", "grub-md5-crypt"], correctAnswer: "grub-md5-crypt", explanation: "" },
  { id: 3015, text: "Question ID 807 Which of the following is not an advantage of GRUB 2 over GRUB Legacy?", type: "single", options: ["Command-line interface", "Ability to work with architectures that dont have a PC BIOS", "Non-ASCII character support", "Ability to boot from partitions inside of Log'ical Volume Management (LVM) or RAID devices", "Dynamically loaded modules"], correctAnswer: "Command-line interface", explanation: "" },
  { id: 3016, text: "Question ID 810 The primary GRUB 2 configuration is overwritten when the _____ command is executed on Fedora systems.", type: "single", options: ["update-grub", "nano", "lilo", "grub2-mkconfig"], correctAnswer: "grub2-mkconfig", explanation: "" },
  { id: 3017, text: "Question ID 811 The primary GRUB 2 configuration is overwritten when the _____ command is executed on Ubuntu systems.", type: "single", options: ["redo", "update-grub", "grub2-mkconfig", "silo"], correctAnswer: "update-grub", explanation: "" },
  { id: 3018, text: "Question ID 813 The GRUB2 setting that sets the default operating system to boot is called _____.", type: "single", options: ["GRUB_BOOT_DEFAULT", "GRUB_DEFAULT", "GRUB_TIMEOUT", "GRUB_DISTRIBUTOR"], correctAnswer: "GRUB_DEFAULT", explanation: "" },
  { id: 3019, text: "Question ID 986 What is the real location of the GRUB Legacy configuration file?", type: "single", options: ["/var/local/grub.conf", "/boot/grub.conf", "/etc/grub/grub.conf", "/boot/grub/grub.conf"], correctAnswer: "/boot/grub/grub.conf", explanation: "" },
  { id: 3020, text: "Question ID 987 What is the full path to the LILO configuration file?", type: "single", options: ["/etc/lilo.conf", "/boot/lilo.conf", "/etc/lilo", "/var/lilo"], correctAnswer: "/etc/lilo.conf", explanation: "" },
  { id: 3021, text: "Question ID 988 To use an encrypted password in the GRUB Legacy configuration file, use the _____ option to the password directive.", type: "single", options: ["crypt", "– md5 –", "encrypt", "secure"], correctAnswer: "– md5 –", explanation: "" },
  { id: 3022, text: "Questio–n ID 989 To spec–ify a runlevel to boot at, add the run level to the end of the _____ directive line.", type: "single", options: ["kernel", "system", "title", "boot"], correctAnswer: "kernel", explanation: "" },
  { id: 3023, text: "Question ID 990 The primary configuration file for the GRUB 2 on a Fedora system is _____.", type: "single", options: ["/boot/grub/grub2.cfg", "/boot/grub2.cfg", "/boot/grub/grub.cfg", "/boot/grub2/grub.cfg"], correctAnswer: "/boot/grub2/grub.cfg", explanation: "" },
  { id: 3024, text: "Question ID 991 The primary configuration file for GRUB 2 on an Ubuntu system is _____.", type: "single", options: ["/boot/grub2/grub.cfg", "/boot/grub/grub2.cfg", "/boot/grub/grub.cfg", "/boot/grub2.cfg"], correctAnswer: "/boot/grub/grub.cfg", explanation: "" },
  { id: 3025, text: "Question ID 992 The firmware bootloader for Sparc systems is called _____.", type: "single", options: ["BIOS", "LILO", "SILO", "BOOT"], correctAnswer: "SILO", explanation: "" },
  { id: 3026, text: "Question ID 993 The firmware bootloader for PowerPC systems is called _____.", type: "single", options: ["SILO", "YABOOT", "BIOS", "LILO"], correctAnswer: "YABOOT", explanation: "" },
  { id: 3027, text: "Question ID 994 Instead of modifying the primary configuration file for GRUB2, you should edit the _____ file.", type: "single", options: ["/etc/grub", "/etc/grub-default", "/etc/default/grub", "/etc/grub-config-all"], correctAnswer: "/etc/default/grub", explanation: "" },
  { id: 3028, text: "Question ID 995 In GRUB Legacy, the _____ directive prevents GRUB from displaying all but the default bootable title until the user presses a key.", type: "single", options: ["securemenu", "title", "titleonly", "hiddenmenu"], correctAnswer: "hiddenmenu", explanation: "" },
  { id: 3029, text: "Question ID 996 In GRUB Legacy, the _____ directive defines the default operating system to boot.", type: "single", options: ["system=", "boot=", "default=", "grub="], correctAnswer: "default=", explanation: "" },
  { id: 3030, text: "Question ID 997 In GRUB Legacy, the _____ directive defines an operating system to boot.", type: "single", options: ["boot", "os", "title", "system"], correctAnswer: "title", explanation: "" },
  { id: 3031, text: "Question ID 820 Which of the following are considered replacements for the traditional init process? (choose two)", type: "multiple", options: ["Sysinit", "Upstart", "Starter", "Systemd"], correctAnswer: ["Sysinit", "Systemd"], explanation: "" },
  { id: 3032, text: "Question ID 825 Which runlevel number defines multi-user with no networking services?", type: "single", options: ["2", "0", "5", "1", "6", "4", "3"], correctAnswer: "2", explanation: "" },
  { id: 3033, text: "Question ID 827 Instead of using traditional runlevels, Systemd uses:", type: "single", options: ["Targets", "Variables", "States", "Functions"], correctAnswer: "Targets", explanation: "" },
  { id: 3034, text: "Question ID 832 Which of the following commands will allow you to change the system runlevel, on a system with traditional init? (choose two)", type: "multiple", options: ["telinit", "systemctl", "init", "chginit"], correctAnswer: ["telinit", "init"], explanation: "" },
  { id: 3035, text: "Question ID 833 Which of the following commands will allow you to change the system to another runlevel, on a system with Systemd? (choose two)", type: "multiple", options: ["telinit", "systemctl", "chginit", "init"], correctAnswer: ["systemctl", "init"], explanation: "" },
  { id: 3036, text: "Question ID 834 Which of the following commands can be used to reboot the system? (choose two)", type: "multiple", options: ["shutdown -r", "shutdown", "halt", "reboot"], correctAnswer: ["shutdown -r", "reboot"], explanation: "" },
  { id: 3037, text: "Question ID 835 Which of the following commands can be used to halt the system? (choose two)", type: "multiple", options: ["shutdown", "reboot", "halt", "poweroff"], correctAnswer: ["halt", "poweroff"], explanation: "" },
  { id: 3038, text: "Question ID 998 Which runlevel number is defined as “user- definable”?", type: "single", options: ["3", "6", "0", "2", "5", "1", "4"], correctAnswer: "4", explanation: "" },
  { id: 3039, text: "Question ID 999 Which runlevel number defines rebooting the system?", type: "single", options: ["1", "2", "3", "6", "4", "0", "5"], correctAnswer: "6", explanation: "" },
  { id: 3040, text: "Question ID 1000 Which runlevel number defines multi-user with networking services and no GUI?", type: "single", options: ["4", "3", "6", "2", "1", "0", "5"], correctAnswer: "3", explanation: "" },
  { id: 3041, text: "Question ID 1001 Which runlevel number defines multi-user with GUI?", type: "single", options: ["1", "6", "4", "0", "2", "3", "5"], correctAnswer: "5", explanation: "" },
  { id: 3042, text: "Question ID 1002 Which runlevel number defines halting the system?", type: "single", options: ["0", "3", "2", "6", "4", "5", "1"], correctAnswer: "0", explanation: "" },
  { id: 3043, text: "Question ID 1003 Which command will display both the current runlevel and the previous runlevel?", type: "single", options: ["run", "level", "rl", "runlevel"], correctAnswer: "runlevel", explanation: "" },
  { id: 3044, text: "Question ID 1006 On a Ubuntu system, what variable defines the default runlevel in the /etc/init/rc-sysinit.conf file?", type: "single", options: ["RUNLEVEL", "DEFAULT", "DEFAULT_RUNLEVEL", "RUN"], correctAnswer: "DEFAULT_RUNLEVEL", explanation: "" },
  { id: 3045, text: "Question ID 1007 For traditional init, the _____ file is where the initial default runlevel is defined.", type: "single", options: ["/etc/initdefault", "/etc/init", "/etc/inittab", "/etc/sysinit"], correctAnswer: "/etc/inittab", explanation: "" },
  { id: 3046, text: "Question ID 1008 What option to the who command will display the current runlevel?", type: "single", options: ["-t", "-r", "-a", "-s"], correctAnswer: "-r", explanation: "" },
  { id: 3047, text: "Question ID 1017 Where are the scripts used to manage the init process located?", type: "single", options: ["/etc/rc.init", "/rc.d/init.d", "/etc/rc.d/init.d", "/etc/init/rc.d"], correctAnswer: "/etc/rc.d/init.d", explanation: "" },
  { id: 3048, text: "Question ID 1018 Which of the following can be used to restart the HTTP service? (choose two)", type: "multiple", options: ["/etc/init.d/httpd restart", "service httpd restart", "service httpd re start", "service https restart"], correctAnswer: ["/etc/init.d/httpd restart", "service httpd restart"], explanation: "" },
  { id: 3049, text: "Question ID 1019 The same set of services are started or stopped at different runlevels. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 3050, text: "Question ID 1020 Which directories exist in the /etc/rc.d directory?", type: "single", options: ["d. rc0.d, rc1.d, rc2.d, rc3.d, rc4.d, rc5.d and rc6.d", "c. rc0d, rc1d, rc2d, rc3d, rc4d and rc5d", "rc0.d, rc2.d, rc4.d, and rc6.d", "b. rc0, rc1, rc2, rc3, rc4, rc5 and rc6"], correctAnswer: "d. rc0.d, rc1.d, rc2.d, rc3.d, rc4.d, rc5.d and rc6.d", explanation: "" },
  { id: 3051, text: "Question ID 1021 Which of the following commands will have the httpd service start at runlevel 5?", type: "single", options: ["ln -s /etc/init.d/httpd /etc/rc.d/rc5.d/S85httd", "cp /etc/init.d/httpd /etc/init.d/rc5.d", "ln -s /etc/init.d/httpd /etc/rc.d/rc5.d/K85httpd", "cp /etc/init.d/httpd /etc/rc.d"], correctAnswer: "ln -s /etc/init.d/httpd /etc/rc.d/rc5.d/S85httd", explanation: "" },
  { id: 3052, text: "Question ID 1022 Which command is used to view the services that are set to start or stop automatically?", type: "single", options: ["lsconfig", "chkconfig", "initconfig", "config"], correctAnswer: "chkconfig", explanation: "" },
  { id: 3053, text: "Question ID 1023 Which of the following is used to turn off the atd service at runlevels 2 and 4?", type: "single", options: ["chkconfig off 24 atd", "chkconfig level 24 atd disable", "– – chkconfig level 24 atd off –", "chkconfig level 24 atd auto off"], correctAnswer: "– – chkconfig level 24 atd off –", explanation: "" },
  { id: 3054, text: "Question ID 1024 – Which is the default runlevel for Debian based Linux systems?", type: "single", options: ["3", "5", "4", "2"], correctAnswer: "2", explanation: "" },
  { id: 3055, text: "Question ID 1025 Which of the following is used to define the start of the Apache web server for runlevels 2-4 in the /etc/init.d/apache2.conf file?", type: "single", options: ["start on runlevel [2-4]", "start on run_level [234]", "enable runlevel [234]", "start on runlevel [234]"], correctAnswer: "enable runlevel [234]", explanation: "" },
  { id: 3056, text: "Question ID 1026 Which of the following commands is used as a traditional replacement for the init process?", type: "single", options: ["iostat", "ioctl", "systemctl", "sudo"], correctAnswer: "systemctl", explanation: "" },
  { id: 3057, text: "Question ID 1027 Which of the following commands is used to view the status of all services?", type: "single", options: ["systemctl a", "systemctl l", "systemctl -–l", "– systemctl all –"], correctAnswer: "– systemctl all –", explanation: "" },
  { id: 3058, text: "Question ID 1028 Which of the following is not a Linux boot system?", type: "single", options: ["bootup", "systemd", "upstart", "init"], correctAnswer: "bootup", explanation: "" },
  { id: 3059, text: "Question ID 649 A device name of /dev/hda1 indicates this partition is on which type of device?", type: "single", options: ["IDE", "CDROM", "Logical Volume", "SATA"], correctAnswer: "IDE", explanation: "" },
  { id: 3060, text: "Question ID 650 A device name of /dev/sda1 indicates this partition is on which type of device?", type: "single", options: ["IDE", "SATA", "CDROM", "Logical Volume"], correctAnswer: "SATA", explanation: "" },
  { id: 3061, text: "Question ID 664 Which of the following is not a common reason to create a partition?", type: "single", options: ["To support multiple operating systems on a single computer", "To increase the security of a filesystem", "To make it easier to keep home directories during a software upgrade", "To increase fragmentation of free space across the disk"], correctAnswer: "To increase fragmentation of free space across the disk", explanation: "" },
  { id: 3062, text: "Question ID 665 Which directories are typically writable to all users? (choose two)", type: "multiple", options: ["/home", "/var/tmp", "/", "/tmp"], correctAnswer: ["/var/tmp", "/tmp"], explanation: "" },
  { id: 3063, text: "Question ID 666 Which directory is the root file system mounted on?", type: "single", options: ["/rootfs", "/root", "/", "/home"], correctAnswer: "/", explanation: "" },
  { id: 3064, text: "Question ID 667 In which directory are you most likely to find software from third-party publishers?", type: "single", options: ["/opt", "/var/lib", "/usr/local", "/usr/third"], correctAnswer: "/opt", explanation: "" },
  { id: 3065, text: "Question ID 668 Which directory does not have to be a part of the root filesystem?", type: "single", options: ["/home", "/etc", "/lib", "/bin"], correctAnswer: "/home", explanation: "" },
  { id: 3066, text: "Question ID 691 Which of the following filesystems does not support journaling?", type: "single", options: ["ext2", "ext3", "jfs", "ext4"], correctAnswer: "ext2", explanation: "" },
  { id: 3067, text: "Question ID 922 A system that contains Linux as well as a Microsoft Windows operating system is called a:", type: "single", options: ["This sort of system cannot exist", "Dual boot system", "A file base system", "Multi environment system"], correctAnswer: "Dual boot system", explanation: "" },
  { id: 3068, text: "Question ID 923 In what directory are you most likely to find user's home directories?", type: "single", options: ["/usr/third", "/home", "/var/lib", "/usr/local"], correctAnswer: "/home", explanation: "" },
  { id: 3069, text: "Question ID 924 Virtual memory is also referred to as:", type: "single", options: ["Swap memory", "Test memory", "Soft memory", "Hard memory"], correctAnswer: "Swap memory", explanation: "" },
  { id: 3070, text: "Question ID 925 Which directory structure has directories which may have heavy activity for services like mail, ftp, httpd and printing?", type: "single", options: ["/root", "/home", "/var", "/rootfs"], correctAnswer: "/var", explanation: "" },
  { id: 3071, text: "Question ID 926 Which directory structure contains the bulk of the operating system's files:", type: "single", options: ["/rootfs", "/usr", "/root", "/home"], correctAnswer: "/usr", explanation: "" },
  { id: 3072, text: "Question ID 669 Which command is used from the command line, to edit your disk's partition table?", type: "single", options: ["gedit", "parttool", "fdisk", "dedit"], correctAnswer: "fdisk", explanation: "" },
  { id: 3073, text: "Question ID 670 If you want to initialize swap space that you've just created, which command would you run?", type: "single", options: ["swapon", "initswap", "mkswap", "swapinit"], correctAnswer: "mkswap", explanation: "" },
  { id: 3074, text: "Question ID 671 To activate a swap space that has been initialized, you can execute:", type: "single", options: ["swapon", "swapctl", "swapoff", "swapcontrol"], correctAnswer: "swapon", explanation: "" },
  { id: 3075, text: "Question ID 672 If you want to create a Fourth Extended Filesystem on a partition, which commands could you use? (choose two)", type: "multiple", options: ["mkdosfs", "mke2fs", "mkfs", "mkextfs"], correctAnswer: ["mke2fs", "mkfs"], explanation: "" },
  { id: 3076, text: "Question ID 683 Which of the following commands will allow you to backup a partition table to a file and restore it at a later time?", type: "single", options: ["ddisk", "sfdisk", "pdisk", "edisk"], correctAnswer: "sfdisk", explanation: "" },
  { id: 3077, text: "Question ID 688 Which of the following commands will allow you to add a physical volume to an existing volume group?", type: "single", options: ["vgextend", "vgcreate", "vgadd", "vgreduce"], correctAnswer: "vgextend", explanation: "" },
  { id: 3078, text: "Question ID 927 After running fdisk -cu /dev/sdb, what fdisk command will allow you to list the current partition table?", type: "single", options: ["s", "p", "w", "l"], correctAnswer: "p", explanation: "" },
  { id: 3079, text: "Question ID 928 After running fdisk -cu /dev/sdb, what fdisk command will allow you to change a partition type?", type: "single", options: ["g", "f", "t", "d"], correctAnswer: "t", explanation: "" },
  { id: 3080, text: "Question ID 929 After running fdisk -cu /dev/sdb, what fdisk command will allow you to create a new partition?", type: "single", options: ["c", "w", "n", "g"], correctAnswer: "n", explanation: "" },
  { id: 3081, text: "Question ID 930 After running fdisk -cu /dev/sdb, what fdisk command will allow you to delete a partition?", type: "single", options: ["d", "g", "s", "r"], correctAnswer: "d", explanation: "" },
  { id: 3082, text: "Question ID 931 After running fdisk -cu /dev/sdb, what fdisk command will allow you to quit without saving changes?", type: "single", options: ["h", "w", "g", "q"], correctAnswer: "q", explanation: "" },
  { id: 3083, text: "Question ID 933 After running fdisk -cu /dev/sdb, what fdisk command will allow you to save changes and quit?", type: "single", options: ["q", "w", "g", "f"], correctAnswer: "w", explanation: "" },
  { id: 3084, text: "Question ID 934 Which command is used to create a logical volume?", type: "single", options: ["lvcreate", "create", "lvadd", "createlv"], correctAnswer: "lvcreate", explanation: "" },
  { id: 3085, text: "Question ID 935 Which command is used to create a volume group?", type: "single", options: ["create", "creategv", "vgadd", "vgcreate"], correctAnswer: "vgcreate", explanation: "" },
  { id: 3086, text: "Question ID 936 Which mke2fs option defines the block size of the filesystem?", type: "single", options: ["-block", "-blk", "-b", "-bk"], correctAnswer: "-b", explanation: "" },
  { id: 3087, text: "Question ID 937 Which mke2fs option defines the percentage of the filesystem that is reserved for system use?", type: "single", options: ["-r", "-m", "-s", "-g"], correctAnswer: "-m", explanation: "" },
  { id: 3088, text: "Question ID 938 What option to the fdisk command is used for MS- DOS compatibility mode?", type: "single", options: ["-c", "-m", "-d", "-ms-dos"], correctAnswer: "-c", explanation: "" },
  { id: 3089, text: "Question ID 939 What option to the fdisk command is used to display current partitions?", type: "single", options: ["-f", "-p", "-a", "-l"], correctAnswer: "-l", explanation: "" },
  { id: 3090, text: "Question ID 940 What option to the fdisk command is used to utilize sector unit sizes?", type: "single", options: ["-s", "-t", "-usize", "-u"], correctAnswer: "-u", explanation: "" },
  { id: 3091, text: "Question ID 941 What option to the mkfs command allows you to specify the type of filesystem to create?", type: "single", options: ["-fs", "-t", "-fstype", "-f"], correctAnswer: "-t", explanation: "" },
  { id: 3092, text: "Question ID 942 Which command is used to create a physical volume?", type: "single", options: ["pvadd", "create", "createpv", "pvcreate"], correctAnswer: "pvcreate", explanation: "" },
  { id: 3093, text: "Question ID 694 Which file provides persistent mapping of block devices to mount points?", type: "single", options: ["/etc/blk.map", "/etc/blk.id", "/etc/fstable", "/etc/fstab"], correctAnswer: "/etc/fstab", explanation: "" },
  { id: 3094, text: "Question ID 695 Which two arguments may the mount command require, in order to mount a filesystem? (choose two)", type: "multiple", options: ["The filesystem size", "The device pathname", "A directory pathname", "The filesystem type"], correctAnswer: ["The device pathname", "A directory pathname"], explanation: "" },
  { id: 3095, text: "Question ID 696 If you want to unmount a partition, which command should you use?", type: "single", options: ["dismount", "unmount", "umount", "mount"], correctAnswer: "umount", explanation: "" },
  { id: 3096, text: "Question ID 697 If the command you used to unmount a partition fails, which commands can you use to check what is keeping the partition busy? (choose two)", type: "multiple", options: ["chkdsk", "lsof", "partchk", "fuser"], correctAnswer: ["lsof", "fuser"], explanation: "" },
  { id: 3097, text: "Question ID 698 What commands can display a list of mounted file systems? (choose two)", type: "multiple", options: ["mount", "lspt", "fdisk", "df"], correctAnswer: ["mount", "df"], explanation: "" },
  { id: 3098, text: "Question ID 699 The first field in the /etc/fstab file is used to specify:", type: "single", options: ["The fsck order", "The dump level", "The mount options", "The filesystem type", "The device to mount", "The mount point"], correctAnswer: "The device to mount", explanation: "" },
  { id: 3099, text: "Question ID 700 The second field in the /etc/fstab file is used to specify:", type: "single", options: ["The file system type", "The device to mount", "The mount point", "The dump level", "The mount options", "The fsck order"], correctAnswer: "The mount point", explanation: "" },
  { id: 3100, text: "Question ID 701 The third field in the /etc/fstab file is used to specify:", type: "single", options: ["The fsck order", "The dump level", "The mount options", "The filesystem type", "The mount point", "The device to mount"], correctAnswer: "The filesystem type", explanation: "" },
  { id: 3101, text: "Question ID 702 The fourth field in the /etc/fstab file is used to specify:", type: "single", options: ["The dump level", "The mount options", "The mount point", "The filesystem type", "The fsck order", "The device to mount"], correctAnswer: "The mount options", explanation: "" },
  { id: 3102, text: "Question ID 703 The fifth field in the /etc/fstab file is used to specify:", type: "single", options: ["The fsck order", "The mount options", "The device to mount", "The filesystem type", "The mount point", "The dump level"], correctAnswer: "The dump level", explanation: "" },
  { id: 3103, text: "Question ID 704 The sixth field in the /etc/fstab file is used to specify:", type: "single", options: ["The mount options", "The dump level", "The device to mount", "The filesystem type", "The mount point", "The fsck order"], correctAnswer: "The fsck order", explanation: "" },
  { id: 3104, text: "Question ID 710 Which of the following will mount an ISO file named cdrom.iso?", type: "single", options: ["mount -t ufs cdrom.iso /mnt", "mount -o loopback cdrom.iso /mnt", "mount -o loop cdrom.iso /mnt", "mount -t cdrom cdrom.iso /mntb"], correctAnswer: "mount -o loop cdrom.iso /mnt", explanation: "" },
  { id: 3105, text: "Question ID 711 Which of the following is not a reason why the umount command may fail?", type: "single", options: ["There is an executable file running that is located within the filesystem", "There is a file open that is located within the filesystem", "There are symbolic links to files within the filesystem", "A user has a directory within the filesystem as their current working directory"], correctAnswer: "There are symbolic links to files within the filesystem", explanation: "" },
  { id: 3106, text: "Question ID 716 A mount point is:", type: "single", options: ["An empty directory that is used to access a filesystem", "A partition", "A way to specify mount options", "A device name used for mounting"], correctAnswer: "An empty directory that is used to access a filesystem", explanation: "" },
  { id: 3107, text: "Question ID 718 Which mount option will remount a currently mounted filesystem?", type: "single", options: ["mount -o reset", "mount -o remount", "mount -o mount", "mount -o reload"], correctAnswer: "mount -o remount", explanation: "" },
  { id: 3108, text: "Question ID 722 What does the mount option ro dev mean if placed in the fourth field /etc/fstab file?", type: "single", options: ["Mount the filesystem as read-only and permit device files", "Nothing, there is no dev mount option", "Mount the filesystem as read-only and dont permit device files", "Nothing, the option is invalid because a space is not permitted between options"], correctAnswer: "Nothing, the option is invalid because a space is not permitted between options", explanation: "" },
  { id: 3109, text: "Question ID 723 Which command will describe the mount options available for different filesystems?", type: "single", options: ["mount options", "mount -a", "mount –list", "– man mount"], correctAnswer: "– man mount", explanation: "" },
  { id: 3110, text: "Question ID 943 Which mount option mounts a filesystem allowing both reading and writing?", type: "single", options: ["ro", "raw", "rw", "readwrite"], correctAnswer: "rw", explanation: "" },
  { id: 3111, text: "Question ID 944 Which mount option mounts a filesystem allowing reading only?", type: "single", options: ["ronly", "readonly", "ro", "rw"], correctAnswer: "ro", explanation: "" },
  { id: 3112, text: "Question ID 945 Which mount option mounts a filesystem allowing executable files?", type: "single", options: ["ex", "noexec", "execute", "exec"], correctAnswer: "exec", explanation: "" },
  { id: 3113, text: "Question ID 946 Which mount option mounts a filesystem allowing suid files?", type: "single", options: ["suid", "suidset", "allowsuid", "setsuid"], correctAnswer: "suid", explanation: "" },
  { id: 3114, text: "Question ID 947 Which df command option displays file type?", type: "single", options: ["-T", "-t", "-F", "-f"], correctAnswer: "-T", explanation: "" },
  { id: 3115, text: "Question ID 948 Which option to the fuser command displays verbose information about filesystem activity?", type: "single", options: ["-i", "-v", "-info", "-ver"], correctAnswer: "-v", explanation: "" },
  { id: 3116, text: "Question ID 949 Which option to the fuser command displays attempts to stop all processes using the filesystem?", type: "single", options: ["-s", "-k", "-w", "-p"], correctAnswer: "-k", explanation: "" },
  { id: 3117, text: "Question ID 950 Which command will display UUIDs?", type: "single", options: ["id", "setid", "blkid", "displayid"], correctAnswer: "blkid", explanation: "" },
  { id: 3118, text: "Question ID 951 Which command will create disk labels on an ext3 filesystem?", type: "single", options: ["label", "e2label", "ext3label", "elabel"], correctAnswer: "e2label", explanation: "" },
  { id: 3119, text: "Question ID 952 Which option will mount a filesystem using the default mount options?", type: "single", options: ["standard", "defaults", "default", "all"], correctAnswer: "defaults", explanation: "" },
  { id: 3120, text: "Question ID 953 Which value do you place in the dump field of the /etc/fstab for pseudo-filesystems?", type: "single", options: ["2", "0", "3", "1"], correctAnswer: "0", explanation: "" },
  { id: 3121, text: "Question ID 954 Which value do you place in the fsck field of the /etc/fstab file for pseudo-filesystems?", type: "single", options: ["3", "2", "1", "0"], correctAnswer: "0", explanation: "" },
  { id: 3122, text: "Question ID 724 Which of the following commands will shut down the system?", type: "single", options: ["init 5", "init 1", "init 7", "init 0"], correctAnswer: "init 0", explanation: "" },
  { id: 3123, text: "Question ID 729 Which option to the du command shows a summary of the space used in a directory structure?", type: "single", options: ["-all", "-h", "-s", "-x"], correctAnswer: "-s", explanation: "" },
  { id: 3124, text: "Question ID 730 What determines how many files can be stored in a filesystem?", type: "single", options: ["The number of data blocks", "The number of inodes", "The Superblock size", "The number of bytes"], correctAnswer: "The number of inodes", explanation: "" },
  { id: 3125, text: "Question ID 731 The number of inodes in a filesystem is:", type: "single", options: ["Always the same for every filesystem", "Something that can be changed at a later date", "Determined by the filesystem type", "Determined when the filesystem is created"], correctAnswer: "Determined when the filesystem is created", explanation: "" },
  { id: 3126, text: "Question ID 732 Which of the following commands will display information about the Superblock? (choose two)", type: "multiple", options: ["tune2fs", "dumpe2fs", "superblk -a", "init 0"], correctAnswer: ["tune2fs", "dumpe2fs"], explanation: "" },
  { id: 3127, text: "Question ID 736 Which options to the tune2fs command will change how often a full filesystem check is performed? (choose two)", type: "multiple", options: ["-i", "-w", "-c", "-g"], correctAnswer: ["-i", "-c"], explanation: "" },
  { id: 3128, text: "Question ID 749 By default, the df command displays filesystem use in:", type: "single", options: ["1-K block size", "1-M block size", "1-G block size", "1-T block size"], correctAnswer: "1-K block size", explanation: "" },
  { id: 3129, text: "Question ID 750 Inodes are used to store a file's:", type: "single", options: ["Name", "Contents", "Location", "Metadata"], correctAnswer: "Metadata", explanation: "" },
  { id: 3130, text: "Question ID 955 Which option to the tune2fs command will display filesystem information?", type: "single", options: ["-S", "-L", "-s", "-l"], correctAnswer: "-l", explanation: "" },
  { id: 3131, text: "Question ID 956 Which option to the tune2fs command will change the space reserved for system use?", type: "single", options: ["-M", "-m", "-R", "-r"], correctAnswer: "-m", explanation: "" },
  { id: 3132, text: "Question ID 957 Which option to the tune2fs command will change default mount options?", type: "single", options: ["-o", "-O", "-m", "-M"], correctAnswer: "-o", explanation: "" },
  { id: 3133, text: "Question ID 958 Which option to the tune2fs command will allow you to create a journal for an ext2 filesystem?", type: "single", options: ["-j", "-i", "-I", "-J"], correctAnswer: "-j", explanation: "" },
  { id: 3134, text: "Question ID 959 Which option to the dumpe2fs command will have the command display only superblock information?", type: "single", options: ["-h", "-g", "-s", "-d"], correctAnswer: "-h", explanation: "" },
  { id: 3135, text: "Question ID 960 Which option to the du command will allow you to specify a subdirectory to not include in the results?", type: "single", options: ["-x", "exclude –", "-e", "noinclude"], correctAnswer: "exclude –", explanation: "" },
  { id: 3136, text: "Question ID 961 – Which option to the df command shows “human readable” sizes?", type: "single", options: ["-i", "-d", "-h", "-s"], correctAnswer: "-h", explanation: "" },
  { id: 3137, text: "Question ID 962 Which option to the df command shows how many inodes are free in a filesystem?", type: "single", options: ["-f", "-free", "-inode", "-i"], correctAnswer: "-i", explanation: "" },
  { id: 3138, text: "Question ID 963 The _____ command will display how much space a filesystem has free?", type: "single", options: ["init", "df", "free", "du"], correctAnswer: "df", explanation: "" },
  { id: 3139, text: "Question ID 964 The _____ command will display how much space a directory is using.", type: "single", options: ["du", "dir", "df", "init"], correctAnswer: "du", explanation: "" },
  { id: 3140, text: "Question ID 965 Which option to the dumpe2fs command will have the command display only version information and bad block information?", type: "single", options: ["-b", "-B", "-V", "-v"], correctAnswer: "-b", explanation: "" },
  { id: 3141, text: "Question ID 737 Which of the following is true about the fsck command?", type: "single", options: ["It should only be executed on unmounted filesystems", "It should only be executed on mounted filesystems", "It can only be used to fix ext2 filesystems", "It can only be used to fix ext3 filesystems"], correctAnswer: "It should only be executed on unmounted filesystems", explanation: "" },
  { id: 3142, text: "Question ID 743 The fsck utility uses which file to determine a filesystem type?", type: "single", options: ["/etc/fsck", "/etc/system", "/etc/fstab", "/etc/fsck.config"], correctAnswer: "/etc/fstab", explanation: "" },
  { id: 3143, text: "Question ID 744 If the _____ file exists, then filesystem checks are forced during the boot process.", type: "single", options: ["/fsck", "/forcefsck", "/autofsck", "/forcechk"], correctAnswer: "/forcefsck", explanation: "" },
  { id: 3144, text: "Question ID 746 Which command will allow you to determine where the backup superblock is for a filesystem?", type: "single", options: ["dumpe2fs", "superblk", "e2fsck", "fsck"], correctAnswer: "dumpe2fs", explanation: "" },
  { id: 3145, text: "Question ID 747 In which directory are “missing” files placed by the fsck utility?", type: "single", options: ["missing", "tmp", "fsck", "lost+found"], correctAnswer: "lost+found", explanation: "" },
  { id: 3146, text: "Question ID 966 Which option to the fsck command will answer “yes” to all queries?", type: "single", options: ["-y", "-Y", "-n", "-N"], correctAnswer: "-y", explanation: "" },
  { id: 3147, text: "Question ID 967 Which option to the fsck command will answer “no” to all queries?", type: "single", options: ["-y", "-N", "-n", "-Y"], correctAnswer: "-n", explanation: "" },
  { id: 3148, text: "Question ID 968 Which option to the fsck command forces a system check?", type: "single", options: ["-F", "-f", "-FF", "-ff"], correctAnswer: "-f", explanation: "" },
  { id: 3149, text: "Question ID 969 Which option to the fsck command will allow you to specify the filesystem type?", type: "single", options: ["-F", "-t", "-T", "-f"], correctAnswer: "-t", explanation: "" },
  { id: 3150, text: "Question ID 970 Which option to the e2fsck command allows you to specify an alternative superblock?", type: "single", options: ["-b", "-a", "-d", "-c"], correctAnswer: "-b", explanation: "" },
  { id: 3151, text: "Question ID 971 Missing files don't have their original file names, instead they are named with their _____ number?", type: "single", options: ["device", "GID", "UID", "inode"], correctAnswer: "inode", explanation: "" },
  { id: 3152, text: "Question ID 634 Which of the following are mount options used for disk quotes? (choose two)", type: "multiple", options: ["usrquota", "groupquota", "userquota", "grpquota"], correctAnswer: ["usrquota", "grpquota"], explanation: "" },
  { id: 3153, text: "Question ID 635 In which file are mount options placed to support disk quotas?", type: "single", options: ["/etc/mount", "/etc/ftab", "/etc/mtab", "/etc/fstab"], correctAnswer: "/etc/fstab", explanation: "" },
  { id: 3154, text: "Question ID 636 How can you use quotas to limit the number of files a user can create?", type: "single", options: ["By setting an inode limit", "By setting a stat limit", "By setting an object limit", "By setting a node limit"], correctAnswer: "By setting an inode limit", explanation: "" },
  { id: 3155, text: "Question ID 637 Which command produces a list of users of groups and their quota statistics?", type: "single", options: ["warnquota", "quotarpt", "repquota", "quota"], correctAnswer: "repquota", explanation: "" },
  { id: 3156, text: "Question ID 638 If you want to enable or disable the enforcement of quotas, as administrator you can use _____ and _____. (choose two)", type: "multiple", options: ["quotaon", "quotauncheck", "quotacheck", "quotaoff"], correctAnswer: ["quotaon", "quotaoff"], explanation: "" },
  { id: 3157, text: "Question ID 639 Which command is used to create or update the quota database files?", type: "single", options: ["quotactl", "quotadb", "dbquota", "quotacheck"], correctAnswer: "quotacheck", explanation: "" },
  { id: 3158, text: "Question ID 640 To be able to modify a user's quotas with a non- interactive command, you can use:", type: "single", options: ["quota", "edquota", "setquota", "sedquota"], correctAnswer: "setquota", explanation: "" },
  { id: 3159, text: "Question ID 641 By default, the edquota command will use which editor?", type: "single", options: ["gedit", "joe", "vi", "emacs"], correctAnswer: "vi", explanation: "" },
  { id: 3160, text: "Question ID 642 To view an individual's quota usage, an administrator can use:", type: "single", options: ["quotactl", "stat", "quota", "sedquota"], correctAnswer: "quota", explanation: "" },
  { id: 3161, text: "Question ID 643 With disk quotas you can limit: (choose two)", type: "multiple", options: ["How many files a user can use in a filesystem", "What permissions can be placed on files in a filesystem", "What type of files a user can have in a filesystem", "How much space a user can use in a filesystem"], correctAnswer: ["How many files a user can use in a filesystem", "How much space a user can use in a filesystem"], explanation: "" },
  { id: 3162, text: "Question ID 644 Which of the following filesystems are good choices to implement disk quotas: (choose two)", type: "multiple", options: ["The /tmp filesystem", "The /home filesystem", "The /bin filesystem", "The /usr filesystem"], correctAnswer: ["The /tmp filesystem", "The /home filesystem"], explanation: "" },
  { id: 3163, text: "Question ID 652 The first step to creating a disk quota is:", type: "single", options: ["Edit the /etc/fstab file", "Use the quotaon command", "Reboot the system", "Use the edquota command"], correctAnswer: "Edit the /etc/fstab file", explanation: "" },
  { id: 3164, text: "Question ID 653 When added to the /etc/fstab file, the userquota option will:", type: "single", options: ["Allow for both user and group quotas in the filesystem", "Result in an error message, since userquota is an invalid option", "Allow for user quotas in filesystem", "Allow for group quotas in the filesystem"], correctAnswer: "Result in an error message, since userquota is an invalid option", explanation: "" },
  { id: 3165, text: "Question ID 654 Which command will remount the /data filesystem using the option from the /etc/fstab file?", type: "single", options: ["mount -o remount /dev/sda1 /data", "mount -o remount /data", "mount -o mount /data"], correctAnswer: "mount -o remount /data", explanation: "" },
  { id: 3166, text: "Question ID 655 To create both user and group quota databases with the quotacheck command, use the ___ and ___ options. (choose two)", type: "multiple", options: ["-a", "-g", "-u", "-i"], correctAnswer: ["-g", "-u"], explanation: "" },
  { id: 3167, text: "Question ID 657 The quotacheck command creates databases with which names? (choose two)", type: "multiple", options: ["aquota.group", "aquota.user", "group.quota", "user.quota"], correctAnswer: ["aquota.group", "aquota.user"], explanation: "" },
  { id: 3168, text: "Question ID 659 Which of the following are true about soft limits? (choose two)", type: "multiple", options: ["A user cannot exceed a soft limit", "Soft limits can only be applied to blocks, not the number of inodes", "A warning will appear on the screen if a user reaches the soft limit", "The grace period starts once the soft limit is reached"], correctAnswer: ["A warning will appear on the screen if a user reaches the soft limit", "The grace period starts once the soft limit is reached"], explanation: "" },
  { id: 3169, text: "Question ID 660 Which of the following are true about hard limits? (choose two)", type: "multiple", options: ["The grace period starts once the hard limit is reached", "Hard limits can only be applied to blocks, not the number of inodes", "A user cannot exceed a hard limit", "An error will appear on the screen if a user reaches the hard limit"], correctAnswer: ["A user cannot exceed a hard limit", "An error will appear on the screen if a user reaches the hard limit"], explanation: "" },
  { id: 3170, text: "Question ID 663 If a user has exceeded the block soft quota and the grace period has expired, what happens?", type: "single", options: ["Nothing, the user can still continue to use files as normal", "The question is invalid because users cannot exceed block soft quota limits", "The user will lose data, as files will be deleted automatically by the kernel.", "The soft limit becomes a hard limit until the user goes below the soft limit again"], correctAnswer: "The soft limit becomes a hard limit until the user goes below the soft limit again", explanation: "" },
  { id: 3171, text: "Question ID 914 The ____ option can be used with the edquota command to copy the quota limits from one user account to another.", type: "single", options: ["-u", "-d", "-p", "-c"], correctAnswer: "-p", explanation: "" },
  { id: 3172, text: "Question ID 915 To have the quotacheck create or update all quota databases, use the ___ option.", type: "single", options: ["-a", "-u", "-g", "-o"], correctAnswer: "-a", explanation: "" },
  { id: 3173, text: "Question ID 916 Which command will display the block size of a filesystem?", type: "single", options: ["showe2fs", "displaye2fs", "tune2fs", "printe2fs"], correctAnswer: "tune2fs", explanation: "" },
  { id: 3174, text: "Question ID 917 Which option to the df command displays the number of inodes in a filesystem?", type: "single", options: ["-i", "-I", "ino", "-nodes"], correctAnswer: "-i", explanation: "" },
  { id: 3175, text: "Q– uestion ID 918 Which option to the df command displays the size of a filesystem in “human readable” format?", type: "single", options: ["-g", "No option will provide this feature", "-h", "-human"], correctAnswer: "-h", explanation: "" },
  { id: 3176, text: "Question ID 919 Which option to the edquota command allows you to modify grace periods?", type: "single", options: ["-p", "-t", "-w", "-u"], correctAnswer: "-t", explanation: "" },
  { id: 3177, text: "Question ID 920 Which option to the quotaon command displays which filesystems have quotas turned on for?", type: "single", options: ["-fs", "-f", "-p", "-w"], correctAnswer: "-p", explanation: "" },
  { id: 3178, text: "Question ID 921 You can display current filesystem space usage with the _____ command.", type: "single", options: ["ls", "dw", "df", "du"], correctAnswer: "df", explanation: "" },
  { id: 3179, text: "Question ID 836 What two differences are there between querying an installed RPM and an RPM package file with the rpm command? (choose two)", type: "multiple", options: ["To query the installed RPM, you have to add the -i option.", "You must use the full filename when querying the installed RPM.", "You must use the full filename when querying the package.", "To query the package file, you have to add the -p option."], correctAnswer: ["You must use the full filename when querying the package.", "To query the package file, you have to add the -p option."], explanation: "" },
  { id: 3180, text: "Question ID 837 If you use the -f option when performing an rpm query:", type: "single", options: ["The command will display the full filename of the original package.", "The command output will wrap at half screen width.", "The command will show the package that owns a file.", "The command will output a list of the files in the packages."], correctAnswer: "The command will show the package that owns a file.", explanation: "" },
  { id: 3181, text: "Question ID 839 If you you have a RPM package file named, figlet- 1.1-0.3.i686.rpm, which rpm commands will install it? (choose two)", type: "multiple", options: ["rpm -F figlet-1.1-0.3.i686.rpm", "rpm -U figlet-1.1-0.3.i686.rpm", "rpm -e figlet-1.1-0.3.i686.rpm", "rpm -i figlet-1.1-0.3.i686.rpm"], correctAnswer: ["rpm -U figlet-1.1-0.3.i686.rpm", "rpm -i figlet-1.1-0.3.i686.rpm"], explanation: "" },
  { id: 3182, text: "Question ID 840 The rpm2cpio command can be used to: (choose two)", type: "multiple", options: ["List the content of a .rpm file “ ”", "Create a new .rpm file", "Build a binary .rpm file from a source .src.rpm file", "“ ” “ ” “ ” Extract files from a .rpm file “ ”"], correctAnswer: ["List the content of a .rpm file “ ”", "“ ” “ ” “ ” Extract files from a .rpm file “ ”"], explanation: "" },
  { id: 3183, text: "Question ID 846 What is the primary configuration file for yum?", type: "single", options: ["/etc/yum.conf", "/etc/yum.d/yum.conf", "/etc/yum/main.conf", "/etc/yum/yum.conf"], correctAnswer: "/etc/yum.conf", explanation: "" },
  { id: 3184, text: "Question ID 847 In what directory are yum repository configuration files stored?", type: "single", options: ["/usr/share/yum", "/etc/yum", "/etc/yum.repos.d", "/var/lib/yum"], correctAnswer: "/etc/yum.repos.d", explanation: "" },
  { id: 3185, text: "Question ID 850 How can you determine the RPM package that owns a file?", type: "single", options: ["yum info", "yum find", "yum owns", "yum provides"], correctAnswer: "yum provides", explanation: "" },
  { id: 3186, text: "Question ID 852 What is the main advantage in using yum over rpm?", type: "single", options: ["It can automatically resolve dependency issues between packages", "It is able to use multiple repositories", "It is able to install packages from internet addresses", "It will allow you to override dependencies"], correctAnswer: "It can automatically resolve dependency issues between packages", explanation: "" },
  { id: 3187, text: "Question ID 854 How can you remove a package using an rpm command?", type: "single", options: ["rpm -r", "rpm -d", "rpm -e", "rpm -x"], correctAnswer: "rpm -e", explanation: "" },
  { id: 3188, text: "Question ID 858 Which command will show the dependencies of an RPM package?", type: "single", options: ["yum requires", "yum provides", "rpm -qpd", "rpm -qpR"], correctAnswer: "rpm -qpR", explanation: "" },
  { id: 3189, text: "Question ID 859 How is the kernel package special for package management?", type: "single", options: ["New versions should be installed instead of upgraded", "It cannot be uninstalled", "It contains the core of the operating system", "New versions should be upgraded instead of installed"], correctAnswer: "New versions should be installed instead of upgraded", explanation: "" },
  { id: 3190, text: "Question ID 861 Which command shows the scripts that may be part of a RPM package?", type: "single", options: ["yum info", "yum scripts", "rpm -q scripts –", "rpm -qs"], correctAnswer: "rpm -q scripts –", explanation: "" },
  { id: 3191, text: "Question ID 864 Which command will check the integrity of an RPM file?", type: "single", options: ["rpm -qcp", "rpm -qKp", "rpm -qCp", "rpm -qkp"], correctAnswer: "rpm -qKp", explanation: "" },
  { id: 3192, text: "Question ID 865 All RPM package management commands must be run as the root user. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 3193, text: "Question ID 1009 What are the correct options for the rpm command to display a list of all installed packages?", type: "single", options: ["-a", "-qall", "-b", "-qa"], correctAnswer: "-qa", explanation: "" },
  { id: 3194, text: "Question ID 1010 Which command will download RPM files from repositories?", type: "single", options: ["yumupdate", "yumdownloader", "rpmupdate", "rpmdownloader"], correctAnswer: "yumdownloader", explanation: "" },
  { id: 3195, text: "Question ID 843 Which command will remove all files that belong to a Debian package?", type: "single", options: ["apt-get erase", "apt-get remove", "apt-get uninstall", "apt-get purge"], correctAnswer: "apt-get purge", explanation: "" },
  { id: 3196, text: "Question ID 844 What command will update a single Debian package named figlet?", type: "single", options: ["apt-get install figlet", "apt-get freshen figlet", "apt-get upgrade figlet", "apt-get update figlet"], correctAnswer: "apt-get install figlet", explanation: "" },
  { id: 3197, text: "Question ID 845 Which command will update the list of available packages for APT?", type: "single", options: ["apt-cache update", "apt-cache upgrade", "apt-get upgrade", "apt-get update"], correctAnswer: "apt-get update", explanation: "" },
  { id: 3198, text: "Question ID 848 In which file are repositories stored for Debian package management?", type: "single", options: ["/etc/apt/source.repo", "/etc/apt/repo.list", "/etc/apt/sources.list", "/etc/repo.list"], correctAnswer: "/etc/apt/sources.list", explanation: "" },
  { id: 3199, text: "Question ID 849 Which is not a tool used for Debian package management?", type: "single", options: ["aptitude", "synaptic", "dpkg", "deb"], correctAnswer: "deb", explanation: "" },
  { id: 3200, text: "Question ID 851 How can you determine the Debian package that owns a file?", type: "single", options: ["dpkg -f", "dpkg -o", "dpkg -S", "dpkg -i"], correctAnswer: "dpkg -S", explanation: "" },
  { id: 3201, text: "Question ID 855 How can you remove a package but not its configuration files with Debian package management?", type: "single", options: ["dpkg -e", "dpkg -p", "apt-get remove", "apt-get erase"], correctAnswer: "apt-get remove", explanation: "" },
  { id: 3202, text: "Question ID 856 Which command may be used to get a list of the installed Debian packages?", type: "single", options: ["dpkg -L", "apt-get list", "apt-get show", "dpkg -l"], correctAnswer: "dpkg -l", explanation: "" },
  { id: 3203, text: "Question ID 857 Which command will show the dependencies of a Debian package?", type: "single", options: ["apt-cache requires", "apt-get requires", "apt-get depends", "apt-cache depends"], correctAnswer: "apt-cache depends", explanation: "" },
  { id: 3204, text: "Question ID 860 Which two commands will show detailed information about a Debian package? (choose two)", type: "multiple", options: ["apt-cache info", "dpkg -i", "apt-cache show", "dpkg -s"], correctAnswer: ["apt-cache show", "dpkg -s"], explanation: "" },
  { id: 3205, text: "Question ID 842 Which two directories are automatically searched for shared libraries? (choose two)", type: "multiple", options: ["/lib", "/usr/lib", "/usr/library", "/library"], correctAnswer: ["/lib", "/usr/lib"], explanation: "" },
  { id: 3206, text: "Question ID 862 Which command is used to display the shared libraries of a dynamically linked executable?", type: "single", options: ["ldlist", "ldd", "ld.so", "ldconfig"], correctAnswer: "ldd", explanation: "" },
  { id: 3207, text: "Question ID 863 Which command can an administrator run to rebuild the cache of shared libraries?", type: "single", options: ["ldd", "ldlist", "ld.so", "ldconfig"], correctAnswer: "ldconfig", explanation: "" },
  { id: 3208, text: "Question ID 1011 Which environment variable can a user set, that will affect where shared libraries can be located and loaded?", type: "single", options: ["LD_LIBRARY_PATH", "LIBRARY_PATH", "LD_PATH", "LIBRARY_LD_PATH"], correctAnswer: "LD_LIBRARY_PATH", explanation: "" },
  { id: 3209, text: "Question ID 1012 Which of the following are benefits of a shared library: (choose two)", type: "multiple", options: ["Programs run slower", "Programs can be smaller", "Programs run faster", "Programs use a more consistent base of code"], correctAnswer: ["Programs can be smaller", "Programs use a more consistent base of code"], explanation: "" },
  { id: 3210, text: "Question ID 1013 Which of the following will find and load shared libraries when a program is executed?", type: "single", options: ["The kernel", "The dynamic linker", "The scheduler", "The init process"], correctAnswer: "The dynamic linker", explanation: "" },
  { id: 3211, text: "Question ID 1014 Which of the following contents is in the ldconfig configuration file by default?", type: "single", options: ["include ld.so.conf.d/*.conf", "include ldconfig", "include /etc/ldconfig", "include all"], correctAnswer: "include ld.so.conf.d/*.conf", explanation: "" },
  { id: 3212, text: "Question ID 1015 Which of the following commands would display the libraries used by the /bin/ls command?", type: "single", options: ["ls -lib /bin/ls", "ldconfig /bin/ls", "listlib /bin/ls", "ldd /bin/ls"], correctAnswer: "ldd /bin/ls", explanation: "" },
  { id: 3213, text: "Question ID 1016 If a library is not accessible due to an error, the the ldd would report which error message?", type: "single", options: ["lib missing", "error: lib not configured", "library missing", "not found"], correctAnswer: "not found", explanation: "" },
  { id: 3214, text: "Question ID 370 Which command is used in order to view the manual page for a topic?", type: "single", options: ["help", "doc", "show", "man"], correctAnswer: "man", explanation: "" },
  { id: 3215, text: "Question ID 371 The basic form of a command line is:", type: "single", options: ["command [options…] [arguments…]", "command arguments options", "command [arguments…] options"], correctAnswer: "command [options…] [arguments…]", explanation: "" },
  { id: 3216, text: "Question ID 376 command [options…] arguments… A command can be: (choose three)", type: "multiple", options: ["A block", "A function", "A program built-in to the shell", "An alias", "A configuration file", "A variable"], correctAnswer: ["A function", "A program built-in to the shell", "An alias"], explanation: "" },
  { id: 3217, text: "Question ID 389 Which of the following man page sections will provide an example of how a command is executed?", type: "single", options: ["The DESCRIPTION section", "The NAME section", "The FILES section", "The SYNOPSIS section"], correctAnswer: "The SYNOPSIS section", explanation: "" },
  { id: 3218, text: "Question ID 395 The command man 5 passwd will:", type: "single", options: ["Display the first five lines of the man page for the passwd command.", "Not work; you cant give a numeric argument to the man command.", "Print the first five man pages that refer to the term passwd.", "Display the man page of Section 5 for passwd."], correctAnswer: "Display the man page of Section 5 for passwd.", explanation: "" },
  { id: 3219, text: "Question ID 402 Which character(s) cannot be placed in variable names?", type: "single", options: ["Hyphen ( - ) character “ “", "Numeric characters", "Underscore ( _ ) character", "Upper-case alpha characters", "Lower-case a“lp”ha characters"], correctAnswer: "Hyphen ( - ) character “ “", explanation: "" },
  { id: 3220, text: "Question ID 403 Shell variables are used to:", type: "single", options: ["Reboot the system", "Prevent users from logging in", "Hide passwords", "Hold critical system information"], correctAnswer: "Hold critical system information", explanation: "" },
  { id: 3221, text: "Question ID 404 Local variables are:", type: "single", options: ["Only available to the shell they are created in", "Passed into other shells and commands", "Are not a valid type of variable", "Not used by shells at all"], correctAnswer: "Only available to the shell they are created in", explanation: "" },
  { id: 3222, text: "Question ID 406 Environment variables cannot be declared by which command?", type: "single", options: ["export", "declare", "set", "typeset"], correctAnswer: "set", explanation: "" },
  { id: 3223, text: "Question ID 411 The /usr/local/bin directory contains:", type: "single", options: ["Essential administrative commands", "Nothing; it is not a valid directory", "The most fundamental commands that are essential for the operating system to function", "Commands that have been compiled from local sources"], correctAnswer: "Commands that have been compiled from local sources", explanation: "" },
  { id: 3224, text: "Question ID 428 The key press combination that will request a running process terminate:", type: "single", options: ["CTRL+c", "CTRL+d", "CTRL+z", "CTRL+p"], correctAnswer: "CTRL+c", explanation: "" },
  { id: 3225, text: "Question ID 435 A popular program for monitoring running processes in real-time is:", type: "single", options: ["watcher", "mon", "ghost", "top"], correctAnswer: "top", explanation: "" },
  { id: 3226, text: "Question ID 437 To send a signal to a set of processes with the same name, you can run:", type: "single", options: ["killall", "sigkill", "allkill", "grpkill"], correctAnswer: "killall", explanation: "" },
  { id: 3227, text: "Question ID 448 Which of the following commands will stop all processes owned by the user bob? (choose two)", type: "multiple", options: ["kill -u bob", "pkill -u bob", "kill -l", "killall -u bob"], correctAnswer: ["pkill -u bob", "killall -u bob"], explanation: "" },
  { id: 3228, text: "Question ID 464 The range defined inside of square brackets is based on the:", type: "single", options: ["ASCII text table", "Invalid question as ranges are not permitted", "ANSI text table", "Standard text table"], correctAnswer: "ASCII text table", explanation: "" },
  { id: 3229, text: "Question ID 467 You can combine glob characters in a single pattern, for example: a??*[0-9]. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 3230, text: "Question ID 477 The ls command can list the contents of only one directory at a time. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 3231, text: "Question ID 479 To perform a “long listing” to show file details, use which of the following commands:", type: "single", options: ["ls -L", "ls -D", "ll", "ls -l"], correctAnswer: "ls -l", explanation: "" },
  { id: 3232, text: "Question ID 486 The mv command can be used to move more than one file at a time. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 3233, text: "Question ID 489 Which option(s) for the rm command can be used to delete directories that contain files? (choose two)", type: "multiple", options: ["-r", "-R", "-D", "-A"], correctAnswer: ["-r", "-R"], explanation: "" },
  { id: 3234, text: "Question ID 496 Which character at the beginning of a long listing indicates a regular file?", type: "single", options: ["c", "d", "l", "–"], correctAnswer: "–", explanation: "" },
  { id: 3235, text: "Question ID 512 To decompress the archive example.gz, use the following command:", type: "single", options: ["gunzip -x example.gz", "gunzip example.gz", "gzip -x example.gz", "gzip -u example.gz"], correctAnswer: "gunzip example.gz", explanation: "" },
  { id: 3236, text: "Question ID 522 By default, tar will attempt to extract an archive…", type: "single", options: ["to the specified directory.", "into the working directory.", "into the users home directory.", "into the archives parent directory."], correctAnswer: "into the working directory.", explanation: "" },
  { id: 3237, text: "Question ID 525  Which of the following options puts the cpio command into copy-in mode?", type: "single", options: ["-o", "-u", "-v", "-i"], correctAnswer: "-i", explanation: "" },
  { id: 3238, text: "Question ID 530 The dd command can be used to create large files the can be used as swap files. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 3239, text: "Question ID 532 Which of the following is not a valid argument for the dd command?", type: "single", options: ["if", "count", "in", "bs", "of"], correctAnswer: "in", explanation: "" },
  { id: 3240, text: "Question ID 537 Which of the following are advantages of using the locate command?", type: "single", options: ["It can search by file attribute types", "It pages the results", "Its results are always the most up to date", "It is quicker than the find command"], correctAnswer: "It is quicker than the find command", explanation: "" },
  { id: 3241, text: "Question ID 546 Many commands that read text files will also read from this stream:", type: "single", options: ["redirect", "stdin", "pipe", "input"], correctAnswer: "stdin", explanation: "" },
  { id: 3242, text: "Question ID 547 If you want to overwrite a file by redirecting the output of a command, you can use:", type: "single", options: ["&", "}", ">", "|"], correctAnswer: ">", explanation: "" },
  { id: 3243, text: "Question ID 548 To redirect the errors that are output by a command, you can use:", type: "single", options: ["2@", "2&", "2>", "@"], correctAnswer: "2>", explanation: "" },
  { id: 3244, text: "Question ID 550 Which two symbols can effectively redirect stdin to a command? (choose two)", type: "multiple", options: ["<", ">", "|", "!"], correctAnswer: ["<", "|"], explanation: "" },
  { id: 3245, text: "Question ID 552 To send the normal and error output of a command to a single file, you can use:", type: "single", options: ["2>", ">", "1>", "&>"], correctAnswer: "&>", explanation: "" },
  { id: 3246, text: "Question ID 555 The head -n -1 readme.txt command will:", type: "single", options: ["Display all but the last line of readme.txt", "Number the lines of readme.txt", "Show the first character of every line of readme.txt", "Display the first line of readme.txt"], correctAnswer: "Display all but the last line of readme.txt", explanation: "" },
  { id: 3247, text: "Question ID 556 Why would you press CTRL+C when executing tail?", type: "single", options: ["To capture the output into a file", "To stop tail from following a file", "To complete the processing of a file", "To get tail to copy the text it is outputting"], correctAnswer: "To stop tail from following a file", explanation: "" },
  { id: 3248, text: "Question ID 557 Which command merges two files like related tables in a database?", type: "single", options: ["sql", "join", "query", "paste"], correctAnswer: "join", explanation: "" },
  { id: 3249, text: "Question ID 562 Which command will remove consecutive duplicate lines from a file?", type: "single", options: ["unique", "uniq", "dup", "dedup"], correctAnswer: "uniq", explanation: "" },
  { id: 3250, text: "Question ID 568 The _____ command provides many options for formatting a file for printing.", type: "single", options: ["pr", "format", "header", "print"], correctAnswer: "pr", explanation: "" },
  { id: 3251, text: "Question ID 570 Which regular expression character matches zero or more of the previous character?", type: "single", options: [".", "+", "*", "?"], correctAnswer: "*", explanation: "" },
  { id: 3252, text: "Question ID 572 Which of the following regular expression characters is an extended regular expression character?", type: "single", options: ["+", ".", "*", "$"], correctAnswer: "+", explanation: "" },
  { id: 3253, text: "Question ID 575 The regular expression a* is equivalent to:", type: "single", options: ["a{0,1}", "a{1,}", "a{1}", "a{0,}"], correctAnswer: "a{0,}", explanation: "" },
  { id: 3254, text: "Question ID 578 To use regular expression characters to match themselves, you cannot:", type: "single", options: ["Use the fgrep command", "Put the character in the square brackets", "Use the slash in front of the character", "Use the backslash in front of the character"], correctAnswer: "Use the slash in front of the character", explanation: "" },
  { id: 3255, text: "Question ID 579 What is NOT a purpose of using parentheses around parts of a regular expression?", type: "single", options: ["They can be used to change the order that the pattern is evaluating", "They can be used to refer back to what was matched", "They can be used to make alternation more efficient", "They can be used to group characters for repetition"], correctAnswer: "They can be used to change the order that the pattern is evaluating", explanation: "" },
  { id: 3256, text: "Question ID 587 To navigate to the end of the line in vi command mode, you can press:", type: "single", options: ["^", "*", "$", "#"], correctAnswer: "$", explanation: "" },
  { id: 3257, text: "Question ID 593 To search forward from your cursor in your vi document in command mode, you can type __ followed by the pattern to search for.", type: "single", options: ["|", "/", "?"], correctAnswer: "/", explanation: "" },
  { id: 3258, text: "Question ID 597 If you are in vi command mode and want to begin inserting text at the end of the line, you can type:", type: "single", options: ["I", "o", "A", "O"], correctAnswer: "A", explanation: "" },
  { id: 3259, text: "Question ID 601 If you want to move a character to the right in vi command mode, you can press the right arrow key or:", type: "single", options: ["j", "k", "h", "l"], correctAnswer: "l", explanation: "" },
  { id: 3260, text: "Question ID 602 If you want to move up a line in vi command mode, you can press the up arrow key or:", type: "single", options: ["l", "k", "h", "j"], correctAnswer: "k", explanation: "" },
  { id: 3261, text: "Question ID 607 Which permission is necessary on a directory in order for a user to use the cd command to change that directory?", type: "single", options: ["Execute", "None", "Write", "Read"], correctAnswer: "Execute", explanation: "" },
  { id: 3262, text: "Question ID 609 The setuid permission on a file:", type: "single", options: ["Causes the file to run under the users identity", "Causes the file to run under the owners identity", "Causes the file to never run as root", "Causes the file to always run as root"], correctAnswer: "Causes the file to run under the owners identity", explanation: "" },
  { id: 3263, text: "Question ID 629 The command, chmod 1777 /data will:", type: "single", options: ["Make the /data directory a setgid directory", "Make the /data directory a sticky bit directory", "Make the /data directory a setuid directory", "Remove all special permissions"], correctAnswer: "Make the /data directory a sticky bit directory", explanation: "" },
  { id: 3264, text: "Question ID 632 The command, chmod 2777 /data will:", type: "single", options: ["Remove all special permissions", "Make the /data directory a setuid directory", "Make the /data directory a sticky bit directory", "Make the /data directory a setgid directory"], correctAnswer: "Make the /data directory a setgid directory", explanation: "" },
  { id: 3265, text: "Question ID 754 Which are valid link types in Linux? (choose two)", type: "multiple", options: ["Soft links", "Stable links", "Hard links", "Filesystem links"], correctAnswer: ["Soft links", "Hard links"], explanation: "" },
  { id: 3266, text: "Question ID 763 Which is true about hard links?", type: "single", options: ["They can only be created by the root user", "They share inodes", "They are created with the ln -s command", "They can be made to directories"], correctAnswer: "They share inodes", explanation: "" },
  { id: 3267, text: "Question ID 772 Which value represents the inode number in the following output of the ls -li command: 87589 -rw-r– r–. 2 root root 83 Mar 4 22:45 myhosts", type: "single", options: ["87589", "22:45", "2", "83"], correctAnswer: "87589", explanation: "" },
  { id: 3268, text: "Question ID 774 The FHS sets which standard?", type: "single", options: ["Which services should be installed", "Which partitions should be created", "Which directories should be used to hold specific files", "Which filesystem types should be used"], correctAnswer: "Which directories should be used to hold specific files", explanation: "" },
  { id: 3269, text: "Question ID 868 The location of users default shells is stored in the ______ file.", type: "single", options: ["/etc/group", "/etc/gshadow", "/etc/passwd", "/etc/shadow"], correctAnswer: "/etc/passwd", explanation: "" },
  { id: 3270, text: "Question ID 869 Long command options are preceded by which two characters?", type: "single", options: ["**", "||", "—", "&&"], correctAnswer: "—", explanation: "" },
  { id: 3271, text: "Question ID 870 Which two characters do you use to tell the command that you are finished providing options and that the remaining data on the command line is arguments?", type: "single", options: ["**", "—", "||", "&&"], correctAnswer: "—", explanation: "" },
  { id: 3272, text: "Question ID 874 To see a list of commands that are available while viewing a man page, you can type the __ character.", type: "single", options: ["h", "g", "c", "w"], correctAnswer: "h", explanation: "" },
  { id: 3273, text: "Question ID 877 System Administration man pages are typically located in section ___.", type: "single", options: ["6", "9", "8", "7"], correctAnswer: "8", explanation: "" },
  { id: 3274, text: "Question ID 893 What option to the kill command will list the signals for the system?", type: "single", options: ["-r", "-9", "-l", "-list"], correctAnswer: "-l", explanation: "" },
  { id: 3275, text: "Question ID 894 Which glob character matches “exactly one character”?", type: "single", options: ["*", ".", "[", "?"], correctAnswer: "?", explanation: "" },
  { id: 3276, text: "Question ID 895 Which glob character matches “zero or more characters”?", type: "single", options: [".", "?", "[", "*"], correctAnswer: "*", explanation: "" },
  { id: 3277, text: "Question ID 896 Which two characters match “a single character from a set of specified characters”?", type: "single", options: ["[]", "??", "..", "**"], correctAnswer: "[]", explanation: "" },
  { id: 3278, text: "Question ID 904 Which option to the find command will search by user owner?", type: "single", options: ["-person", "-user", "-owner", "-uowner"], correctAnswer: "-user", explanation: "" },
  { id: 3279, text: "Question ID 974 Which type of link can be made to directories, hard or soft?", type: "single", options: ["soft", "hard"], correctAnswer: "soft", explanation: "" },
  { id: 3280, text: "Question ID 975 Which type of link is easier to visually “see”, hard or soft?", type: "single", options: ["hard", "soft"], correctAnswer: "soft", explanation: "" },
  { id: 3281, text: "Question ID 976 Which type of link is indistinguishable by programs from regular files, hard or soft?", type: "single", options: ["hard", "soft"], correctAnswer: "hard", explanation: "" },
  { id: 3282, text: "Question ID 982 Which directory is used to store temporary files?", type: "single", options: ["/etc", "/tmp", "/temp", "/"], correctAnswer: "/tmp", explanation: "" },
  { id: 3283, text: "Question ID 985 Which directory is used for the home directory of the root user?", type: "single", options: ["/home/root", "/", "/var", "/root"], correctAnswer: "/root", explanation: "" },
  { id: 3284, text: "Question ID 639 Which command is used to create or update the quota database files?", type: "single", options: ["quotactl", "quotadb", "quotacheck", "dbquota"], correctAnswer: "quotacheck", explanation: "" },
  { id: 3285, text: "Question ID 641 By default, the edquota command will use which editor?", type: "single", options: ["joe", "emacs", "gedit", "vi"], correctAnswer: "vi", explanation: "" },
  { id: 3286, text: "Question ID 657 The quotacheck command creates databases with which names? (choose two)", type: "multiple", options: ["group.quota", "aquota.group", "aquota.user", "user.quota"], correctAnswer: ["aquota.group", "aquota.user"], explanation: "" },
  { id: 3287, text: "Question ID 666 Which directory is the root file system mounted on?", type: "single", options: ["/rootfs", "/root", "/home", "/"], correctAnswer: "/", explanation: "" },
  { id: 3288, text: "Question ID 667 In which directory are you most likely to find software from third-party publishers?", type: "single", options: ["/usr/local", "/var/lib", "/usr/third", "/opt"], correctAnswer: "/opt", explanation: "" },
  { id: 3289, text: "Question ID 671 To activate a swap space that has been initialized, you can execute:", type: "single", options: ["swapcontrol", "swapon", "swapoff", "swapctl"], correctAnswer: "swapon", explanation: "" },
  { id: 3290, text: "Question ID 699 The first field in the /etc/fstab file is used to specify:", type: "single", options: ["The filesystem type", "The mount point", "The mount options", "The dump level", "The device to mount", "The fsck order"], correctAnswer: "The device to mount", explanation: "" },
  { id: 3291, text: "Question ID 703 The fifth field in the /etc/fstab file is used to specify:", type: "single", options: ["The mount options", "The dump level", "The filesystem type", "The device to mount", "The mount point", "The fsck order"], correctAnswer: "The dump level", explanation: "" },
  { id: 3292, text: "Question ID 704 The sixth field in the /etc/fstab file is used to specify:", type: "single", options: ["The mount point", "The device to mount", "The dump level", "The filesystem type", "The fsck order", "The mount options"], correctAnswer: "The fsck order", explanation: "" },
  { id: 3293, text: "Question ID 718 Which mount option will remount a currently mounted filesystem?", type: "single", options: ["mount -o reset", "mount -o reload", "mount -o mount", "mount -o remount"], correctAnswer: "mount -o remount", explanation: "" },
  { id: 3294, text: "Question ID 730 What determines how many files can be stored in a filesystem?", type: "single", options: ["The number of inodes", "The Superblock size", "The number of data blocks", "The number of bytes"], correctAnswer: "The number of inodes", explanation: "" },
  { id: 3295, text: "Question ID 731 The number of inodes in a filesystem is:", type: "single", options: ["Always the same for every filesystem", "Determined when the filesystem is created", "Determined by the filesystem type", "Something that can be changed at a later date"], correctAnswer: "Determined when the filesystem is created", explanation: "" },
  { id: 3296, text: "Question ID 737 Which of the following is true about the fsck command?", type: "single", options: ["It should only be executed on unmounted filesystems", "It can only be used to fix ext2 filesystems", "It can only be used to fix ext3 filesystems", "It should only be executed on mounted filesystems"], correctAnswer: "It should only be executed on unmounted filesystems", explanation: "" },
  { id: 3297, text: "Question ID 757 Which of the following commands will create a soft link from the /tmp/test file to the /tmp/data file?", type: "single", options: ["ln -s /tmp/data /tmp/test", "ln /tmp/test /tmp/data", "ln -s /tmp/test /tmp/data", "ln /tmp/data /tmp/test"], correctAnswer: "ln -s /tmp/test /tmp/data", explanation: "" },
  { id: 3298, text: "Question ID 758 Which of the following commands will create a hard link from the /tmp/test file to the /tmp/data file?", type: "single", options: ["ln -s /tmp/test /tmp/data", "ln /tmp/test /tmp/data", "ln -s /tmp/data /tmp/test", "ln /tmp/data /tmp/test"], correctAnswer: "ln /tmp/test /tmp/data", explanation: "" },
  { id: 3299, text: "Question ID 772 Which value represents the inode number in the following output of the ls -li command: 87589 -rw-r r . 2 root root 83 Mar 4 22:45 myhosts", type: "single", options: ["83", "2 – –", "22:45", "87589"], correctAnswer: "87589", explanation: "" },
  { id: 3300, text: "Question ID 773 Which value represents the hard link count in the following output of the ls -li command: 87589 -rw-r r . 2 root root 83 Mar 4 22:45 myhosts", type: "single", options: ["83", "– – 2", "22:45", "87589"], correctAnswer: "– – 2", explanation: "" },
  { id: 3301, text: "Question ID 790 Which bootloader includes the Secure Boot feature?", type: "single", options: ["BIOS", "UEFI", "LILO", "GRUB"], correctAnswer: "UEFI", explanation: "" },
  { id: 3302, text: "Question ID 800 In GRUB Legacy, the _____ directive indicates how long to wait before automatically booting the default operating system.", type: "single", options: ["fallback=", "timeout=", "password=", "kernel"], correctAnswer: "timeout=", explanation: "" },
  { id: 3303, text: "Question ID 805 Which of the following commands can be used to create an encrypted password that can be used with the password directive in GRUB Legacy:", type: "single", options: ["crypt-md5-grub", "grub-md5-crypt", "grub-crypt", "crypt-grub"], correctAnswer: "grub-md5-crypt", explanation: "" },
  { id: 3304, text: "Question ID 814 The first stage of the boot process is:", type: "single", options: ["The firmware (BIOS/UEFI) stage", "The init phase", "The kernel phase", "The Bootloader (LILO/GRUB) stage"], correctAnswer: "The firmware (BIOS/UEFI) stage", explanation: "" },
  { id: 3305, text: "Question ID 817 The fourth stage of the boot process is:", type: "single", options: ["The init phase", "The Bootloader (LILO/GRUB) stage", "The firmware (BIOS/UEFI) stage", "The kernel"], correctAnswer: "The init phase", explanation: "" },
  { id: 3306, text: "Question ID 818 The bootloader (GRUB/LILO) loads which of the following components into memory? (choose two)", type: "multiple", options: ["The root filesystem", "The kernel", "The init process", "The ramdisk"], correctAnswer: ["The kernel", "The ramdisk"], explanation: "" },
  { id: 3307, text: "Question ID 834 Which of the following commands can be used to reboot the system? (choose two)", type: "multiple", options: ["shutdown", "halt", "reboot", "shutdown -r"], correctAnswer: ["reboot", "shutdown -r"], explanation: "" },
  { id: 3308, text: "Question ID 836 What two differences are there between querying an installed RPM and an RPM package file with the rpm command? (choose two)", type: "multiple", options: ["You must use the full filename when querying the installed RPM.", "To query the installed RPM, you have to add the -i option.", "You must use the full filename when querying the package.", "To query the package file, you have to add the -p option."], correctAnswer: ["You must use the full filename when querying the package.", "To query the package file, you have to add the -p option."], explanation: "" },
  { id: 3309, text: "Question ID 840 The rpm2cpio command can be used to: (choose two)", type: "multiple", options: ["Create a new .rpm file", "“ ” Extract files from a .rpm file “ ”", "List the content of a .rpm file “ ”", "Build a binary .rpm file from a source .src.rpm file"], correctAnswer: ["“ ” Extract files from a .rpm file “ ”", "List the content of a .rpm file “ ”"], explanation: "" },
  { id: 3310, text: "Question ID 843 Which command will r“emov”e all files that belon“g to a De”bian package?", type: "single", options: ["apt-get purge", "apt-get remove", "apt-get uninstall", "apt-get erase"], correctAnswer: "apt-get purge", explanation: "" },
  { id: 3311, text: "Question ID 845 Which command will update the list of available packages for APT?", type: "single", options: ["apt-cache update", "apt-get update", "apt-cache upgrade", "apt-get upgrade"], correctAnswer: "apt-get update", explanation: "" },
  { id: 3312, text: "Question ID 856 Which command may be used to get a list of the installed Debian packages?", type: "single", options: ["dpkg -l", "dpkg -L", "apt-get list", "apt-get show"], correctAnswer: "dpkg -l", explanation: "" },
  { id: 3313, text: "Question ID 857 Which command will show the dependencies of a Debian package?", type: "single", options: ["apt-cache requires", "apt-get depends", "apt-cache depends", "apt-get requires"], correctAnswer: "apt-cache depends", explanation: "" },
  { id: 3314, text: "Question ID 858 Which command will show the dependencies of an RPM package?", type: "single", options: ["rpm -qpd", "yum provides", "yum requires", "rpm -qpR"], correctAnswer: "rpm -qpR", explanation: "" },
  { id: 3315, text: "Question ID 860 Which two commands will show detailed information about a Debian package? (choose two)", type: "multiple", options: ["apt-cache info", "apt-cache show", "dpkg -s", "dpkg -i"], correctAnswer: ["apt-cache show", "dpkg -s"], explanation: "" },
  { id: 3316, text: "Question ID 861 Which command shows the scripts that may be part of a RPM package?", type: "single", options: ["yum scripts", "yum info", "rpm -qs", "rpm -q scripts –"], correctAnswer: "rpm -q scripts –", explanation: "" },
  { id: 3317, text: "Question ID 862 Which command is used to display the shared libraries of a dynamically linked executable?", type: "single", options: ["ldd", "ld.so", "ldlist", "ldconfig"], correctAnswer: "ldd", explanation: "" },
  { id: 3318, text: "Question ID 918 Which option to the df command displays the size of a filesystem in human readable format?", type: "single", options: ["“ ” -h", "-human", "-g", "No option will provide this feature"], correctAnswer: "“ ” -h", explanation: "" },
  { id: 3319, text: "Question ID 921 You can display current filesystem space usage with the _____ command.", type: "single", options: ["du", "ls", "dw", "df"], correctAnswer: "df", explanation: "" },
  { id: 3320, text: "Question ID 922 A system that contains Linux as well as a Microsoft Windows operating system is called a:", type: "single", options: ["This sort of system cannot exist", "Multi environment system", "A file base system", "Dual boot system"], correctAnswer: "Dual boot system", explanation: "" },
  { id: 3321, text: "Question ID 923 In what directory are you most likely to find users home directories?", type: "single", options: ["/usr/local", "/home", "/var/lib", "/usr/third"], correctAnswer: "/home", explanation: "" },
  { id: 3322, text: "Question ID 925 Which directory structure has directories which may have heavy activity for services like mail, ftp, httpd and printing?", type: "single", options: ["/home", "/rootfs", "/root", "/var"], correctAnswer: "/var", explanation: "" },
  { id: 3323, text: "Question ID 928 After running fdisk -cu /dev/sdb, what fdisk command will allow you to change a partition type?", type: "single", options: ["d", "f", "t", "g"], correctAnswer: "t", explanation: "" },
  { id: 3324, text: "Question ID 929 After running fdisk -cu /dev/sdb, what fdisk command will allow you to create a new partition?", type: "single", options: ["c", "w", "n", "g"], correctAnswer: "n", explanation: "" },
  { id: 3325, text: "Question ID 930 After running fdisk -cu /dev/sdb, what fdisk command will allow you to delete a partition?", type: "single", options: ["r", "g", "d", "s"], correctAnswer: "d", explanation: "" },
  { id: 3326, text: "Question ID 940 What option to the fdisk command is used to utilize sector unit sizes?", type: "single", options: ["-t", "-s", "-usize", "-u"], correctAnswer: "-u", explanation: "" },
  { id: 3327, text: "Question ID 944 Which mount option mounts a filesystem allowing reading only?", type: "single", options: ["readonly", "ronly", "ro", "rw"], correctAnswer: "ro", explanation: "" },
  { id: 3328, text: "Question ID 956 Which option to the tune2fs command will change the space reserved for system use?", type: "single", options: ["-R", "-m", "-M", "-r"], correctAnswer: "-m", explanation: "" },
  { id: 3329, text: "Question ID 959 Which option to the dumpe2fs command will have the command display only superblock information?", type: "single", options: ["-h", "-g", "-d", "-s"], correctAnswer: "-h", explanation: "" },
  { id: 3330, text: "Question ID 963 The _____ command will display how much space a filesystem has free?", type: "single", options: ["du", "free", "df", "init"], correctAnswer: "df", explanation: "" },
  { id: 3331, text: "Question ID 966 Which option to the fsck command will answer yes to all queries?", type: "single", options: ["“ ” -y", "-n", "-N", "-Y"], correctAnswer: "“ ” -y", explanation: "" },
  { id: 3332, text: "Question ID 967 Which option to the fsck command will answer no to all queries?", type: "single", options: ["-y", "-Y “ ”", "-n", "-N"], correctAnswer: "-n", explanation: "" },
  { id: 3333, text: "Question ID 969 Which option to the fsck command will allow you to specify the filesystem type?", type: "single", options: ["-t", "-F", "-T", "-f"], correctAnswer: "-t", explanation: "" },
  { id: 3334, text: "Question ID 971 Missing files dont have their original file names, instead they are named with their _____ number?", type: "single", options: ["device", "inode", "UID", "GID"], correctAnswer: "inode", explanation: "" },
  { id: 3335, text: "Question ID 973 Which type of link can be made to a file on another filesystem, hard or soft?", type: "single", options: ["soft", "hard"], correctAnswer: "soft", explanation: "" },
  { id: 3336, text: "Question ID 988 To use an encrypted password in the GRUB Legacy configuration file, use the _____ option to the password directive.", type: "single", options: ["md5 –", "encrypt", "secure", "–crypt"], correctAnswer: "md5 –", explanation: "" },
  { id: 3337, text: "Q–uestion ID 990 The prim– ary configuration file for the GRUB 2 on a Fedora system is _____.", type: "single", options: ["/boot/grub2/grub.cfg", "/boot/grub/grub2.cfg", "/boot/grub2.cfg", "/boot/grub/grub.cfg"], correctAnswer: "/boot/grub2/grub.cfg", explanation: "" },
  { id: 3338, text: "Question ID 998 Which runlevel number is defined as user-definable ?", type: "single", options: ["6", "5 “ ”", "3", "1", "2", "0", "4"], correctAnswer: "4", explanation: "" },
  { id: 3339, text: "Question ID 1002 Which runlevel number defines halting the system?", type: "single", options: ["5", "3", "4", "0", "2", "6", "1"], correctAnswer: "0", explanation: "" },
  { id: 3340, text: "Question ID 1004 The first process that the kernel launches is called the _____ process.", type: "single", options: ["init", "kernel", "sys", "startx"], correctAnswer: "init", explanation: "" },
  { id: 3341, text: "Question ID 1006 On a Ubuntu system, what variable defines the default runlevel in the /etc/init/rc- sysinit.conf file?", type: "single", options: ["DEFAULT_RUNLEVEL", "DEFAULT", "RUNLEVEL", "RUN"], correctAnswer: "DEFAULT_RUNLEVEL", explanation: "" },
  { id: 3342, text: "Question ID 1009 What are the correct options for the rpm command to display a list of all installed packages?", type: "single", options: ["-qa", "-a", "-qall", "-b"], correctAnswer: "-qa", explanation: "" },
  { id: 3343, text: "Question ID 1011 Which environment variable can a user set, that will affect where shared libraries can be located and loaded?", type: "single", options: ["LIBRARY_PATH", "LIBRARY_LD_PATH", "LD_PATH", "LD_LIBRARY_PATH"], correctAnswer: "LD_LIBRARY_PATH", explanation: "" },
  { id: 3344, text: "Question ID 1012 Which of the following are benefits of a shared library: (choose two)", type: "multiple", options: ["Programs run faster", "Programs can be smaller", "Programs run slower", "Programs use a more consistent base of code"], correctAnswer: ["Programs can be smaller", "Programs use a more consistent base of code"], explanation: "" },
  { id: 3345, text: "Question ID 1013 Which of the following will find and load shared libraries when a program is executed?", type: "single", options: ["The scheduler", "The dynamic linker", "The kernel", "The init process"], correctAnswer: "The dynamic linker", explanation: "" },
  { id: 3346, text: "Question ID 1014 Which of the following contents is in the ldconfig configuration file by default?", type: "single", options: ["include all", "include /etc/ldconfig", "include ldconfig", "include ld.so.conf.d/*.conf"], correctAnswer: "include ld.so.conf.d/*.conf", explanation: "" },
  { id: 3347, text: "Question ID 1022 Which command is used to view the services that are set to start or stop automatically?", type: "single", options: ["config", "chkconfig", "lsconfig", "initconfig"], correctAnswer: "chkconfig", explanation: "" },
  { id: 3348, text: "Question ID 1031 Which of the following is not a daemon used for logging?", type: "single", options: ["klogd", "ilogd", "rsyslogd", "syslogd"], correctAnswer: "ilogd", explanation: "" },
  { id: 3349, text: "Question ID 1034 What is the maximum memory that a 64 bit processor can theoretically use?", type: "single", options: ["16 EiB", "8 GiB", "2 GiB", "4 GiB"], correctAnswer: "16 EiB", explanation: "" },
  { id: 3350, text: "Question ID 1036 Which of the following is not a characteristic of firmware?", type: "single", options: ["Change runlevels", "Tests the components upon startup", "Typically stored in ROM", "Change settings to affect the use of external devices"], correctAnswer: "Change runlevels", explanation: "" },
  { id: 3351, text: "Question ID 1040 Which of the following resources are used by devices to communicate with the system?", type: "single", options: ["IO Channels, IO Memory, Interrupts and DMA Ports", "IO Ports, IO Memory, Interrupts, and DMA Channels", "IO Ports, IO Memory, Signals and DMA Channels", "IO Ports, RAM, Interrupts and DMA Channels"], correctAnswer: "IO Ports, IO Memory, Interrupts, and DMA Channels", explanation: "" },
  { id: 3352, text: "Question ID 1041 Interrupts cannot be shared between devices. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 3353, text: "Question ID 1044 Which option of the lspci command would you use to troubleshoot a network interface card?", type: "single", options: ["-r", "-t", "-nn", "-a"], correctAnswer: "-nn", explanation: "" },
  { id: 3354, text: "Question ID 369 The _____ command displays information about the Linux kernel:", type: "single", options: ["kern", "uname", "real", "linux"], correctAnswer: "uname", explanation: "" },
  { id: 3355, text: "Question ID 376 A command can be: (choose three)", type: "multiple", options: ["A program built-in to the shell", "A variable", "A block", "A configuration file", "An alias", "A function"], correctAnswer: ["A program built-in to the shell", "An alias", "A function"], explanation: "" },
  { id: 3356, text: "Question ID 377 Which of the following are valid command lines? (choose two)", type: "multiple", options: ["ls -l /etc", "ls -/etc", "-l ls /etc", "ls /etc -l"], correctAnswer: ["ls -l /etc", "ls /etc -l"], explanation: "" },
  { id: 3357, text: "Question ID 390 The [ ] characters around day in the example cal [-smjy13] [[[day] month] year] means that day is:", type: "single", options: ["An option, not an argument", "Required", "An argument that must be day and nothing else", "“ ” Optional"], correctAnswer: "“ ” Optional", explanation: "" },
  { id: 3358, text: "Question ID 391 The syntax [-u| utc| universal] means:", type: "single", options: ["These are required options", "These th–ree o–ptions are different", "These three options mean the same thing", "This is invalid syntax"], correctAnswer: "These three options mean the same thing", explanation: "" },
  { id: 3359, text: "Question ID 396 If you want to delete a variable, you can run:", type: "single", options: ["delete", "unset", "clear", "wipe"], correctAnswer: "unset", explanation: "" },
  { id: 3360, text: "Question ID 404 Local variables are:", type: "single", options: ["Only available to the shell they are created in", "Passed into other shells and commands", "Are not a valid type of variable", "Not used by shells at all"], correctAnswer: "Only available to the shell they are created in", explanation: "" },
  { id: 3361, text: "Question ID 417 Which of the following is a valid way to add the /data directory to the existing PATH variable?", type: "single", options: ["PATH=$PATH:/data", "PATH=/data", "$PATH=/data", "$PATH=$PATH:/data"], correctAnswer: "PATH=$PATH:/data", explanation: "" },
  { id: 3362, text: "Question ID 432 To view all processes on the system, you can execute:", type: "single", options: ["ps -f", "ps all", "– ps -e", "ps"], correctAnswer: "– ps -e", explanation: "" },
  { id: 3363, text: "Question ID 433 In order to run a command called tough in the background, you would type:", type: "single", options: ["tough@", "bg tough “ ”", "tough&", "start -b tough"], correctAnswer: "tough&", explanation: "" },
  { id: 3364, text: "Question ID 437 To send a signal to a set of processes with the same name, you can run:", type: "single", options: ["killall", "grpkill", "allkill", "sigkill"], correctAnswer: "killall", explanation: "" },
  { id: 3365, text: "Question ID 456 Which of the following is not used for globbing?", type: "single", options: ["#", "*", "?", "["], correctAnswer: "#", explanation: "" },
  { id: 3366, text: "Question ID 462 The command echo ???a will display:", type: "single", options: ["Only a file named ???a", "All of the files in the current directory that have four characters in the file name with the last character being an a character. “ ”", "All of the files in the current directory that have four characters in the file name.", "All of the files in the current directory that end with an a character."], correctAnswer: "All of the files in the current directory that have four characters in the file name with the last character being an a character. “ ”", explanation: "" },
  { id: 3367, text: "Question ID 463 Which of the following characters can be used to negate (indica“te” NOT matching the following characters), when placed as the first of a set of characters enclosed in square brackets [] ? (choose two)", type: "multiple", options: ["^", "~", "?", "!"], correctAnswer: ["^", "!"], explanation: "" },
  { id: 3368, text: "Question ID 470 Which command performs globbing?", type: "single", options: ["The display command", "The bash command", "The ls command", "The echo command"], correctAnswer: "The bash command", explanation: "" },
  { id: 3369, text: "Question ID 489 Which option(s) for the rm command can be used to delete directories that contain files? (choose two)", type: "multiple", options: ["-R", "-D", "-r", "-A"], correctAnswer: ["-R", "-r"], explanation: "" },
  { id: 3370, text: "Question ID 497 Which character at the beginning of a long listing indicates a symbolic link?", type: "single", options: ["d", "l", "c"], correctAnswer: "l", explanation: "" },
  { id: 3371, text: "Question ID 498 The nam–es of hidden files begin with the ___ character.", type: "single", options: [">", "+", ".", "*"], correctAnswer: ".", explanation: "" },
  { id: 3372, text: "Question ID 499 Which option to the ls command will sort the output by size instead of alphabetically?", type: "single", options: ["-s", "-S", "-r", "-t"], correctAnswer: "-S", explanation: "" },
  { id: 3373, text: "Question ID 513 gzip and bzip are aliases for the same utility. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 3374, text: "Question ID 515 Which option to the bzip2 command can be used to report the compression ratio of an archive?", type: "single", options: ["-R", "-v", "-l", "-c"], correctAnswer: "-v", explanation: "" },
  { id: 3375, text: "Question ID 516 Which option to the bzip2 command can be used for recursive compression?", type: "single", options: ["bzip2 doesnt support recursive compression", "-R", "-c", "-v"], correctAnswer: "bzip2 doesnt support recursive compression", explanation: "" },
  { id: 3376, text: "Question ID 530 The dd command can be used to create large files the can be used as swap files. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 3377, text: "Question ID 531 The dd command can be used to copy entire partitions. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 3378, text: "Question ID 545 This stream is the output of a command operating normally:", type: "single", options: ["stdout", "stdnorm", "stderr", "stdin"], correctAnswer: "stdout", explanation: "" },
  { id: 3379, text: "Question ID 549 Two or more commands combined with the | between them form a:", type: "single", options: ["convoy", "“ ” pipeline", "command line", "caravan"], correctAnswer: "“ ” pipeline", explanation: "" },
  { id: 3380, text: "Question ID 551 If you want to append a file with the normal output of a command, you can use:", type: "single", options: ["2>>", ">>", ">", "1>"], correctAnswer: ">>", explanation: "" },
  { id: 3381, text: "Question ID 552 To send the normal and error output of a command to a single file, you can use:", type: "single", options: ["&>", "1>", "2>", ">"], correctAnswer: "&>", explanation: "" },
  { id: 3382, text: "Question ID 558 Which command will merge two files together line by line?", type: "single", options: ["join", "merge", "paste", "combo"], correctAnswer: "paste", explanation: "" },
  { id: 3383, text: "Question ID 559 Which of the following is a non-interactive editor?", type: "single", options: ["ed", "sed", "vi", "nano"], correctAnswer: "sed", explanation: "" },
  { id: 3384, text: "Question ID 566 If you want a file to be displayed with its lines numbered, you can use:", type: "single", options: ["fmt", "cut", "nl", "number"], correctAnswer: "nl", explanation: "" },
  { id: 3385, text: "Question ID 567 To put the lines of a file in alphabetical order, you can run:", type: "single", options: ["paste", "sort", "cat", "uniq"], correctAnswer: "sort", explanation: "" },
  { id: 3386, text: "Question ID 568 The _____ command provides many options for formatting a file for printing.", type: "single", options: ["format", "header", "print", "pr"], correctAnswer: "pr", explanation: "" },
  { id: 3387, text: "Question ID 569 Which regular expression character matches any one character?", type: "single", options: ["+", ".", "?", "*"], correctAnswer: ".", explanation: "" },
  { id: 3388, text: "Question ID 570 Which regular expression character matches zero or more of the previous character?", type: "single", options: ["*", "+", ".", "?"], correctAnswer: "*", explanation: "" },
  { id: 3389, text: "Question ID 572 Which of the following regular expression characters is an extended regular expression character?", type: "single", options: [".", "*", "$", "+"], correctAnswer: "+", explanation: "" },
  { id: 3390, text: "Question ID 574 The regular expression a? is equivalent to:", type: "single", options: ["a{0,}", "a{0,1}", "a{1,}", "a{1}"], correctAnswer: "a{0,1}", explanation: "" },
  { id: 3391, text: "Question ID 578 To use regular expression characters to match themselves, you cannot:", type: "single", options: ["Put the character in the square brackets", "Use the backslash in front of the character", "Use the slash in front of the character", "Use the fgrep command"], correctAnswer: "Use the slash in front of the character", explanation: "" },
  { id: 3392, text: "Question ID 587 To navigate to the end of the line in vi command mode, you can press:", type: "single", options: ["^", "#", "*", "$"], correctAnswer: "$", explanation: "" },
  { id: 3393, text: "Question ID 588 To move backward through a vi document, word by word, you press:", type: "single", options: ["r", "w", "b", "c"], correctAnswer: "b", explanation: "" },
  { id: 3394, text: "Question ID 592 To save and then quit, you can type in command mode:", type: "single", options: [":q", ":wq", ":WQ", ":qw"], correctAnswer: ":wq", explanation: "" },
  { id: 3395, text: "Question ID 600 If you want to move a character to the left in vi command mode, you can press the left arrow key or:", type: "single", options: ["j", "h", "k", "l"], correctAnswer: "h", explanation: "" },
  { id: 3396, text: "Question ID 602 If you want to move up a line in vi command mode, you can press the up arrow key or:", type: "single", options: ["k", "l", "h", "j"], correctAnswer: "k", explanation: "" },
  { id: 3397, text: "Question ID 606 If a file has permissions that appear as rwxr-x , what is the octal permission mode of the file?", type: "single", options: ["— 750", "740", "650", "760"], correctAnswer: "— 750", explanation: "" },
  { id: 3398, text: "Question ID 608 The only user with the capability to change the owner of a file is root. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 3399, text: "Question ID 617 Assuming everyone has access to the directory the file is in, who can view the contents of a file with permissions of rw-r -x?", type: "single", options: ["Only the group owners", "— Both the user owner and group owners", "Only the user owner", "Everyone", "Nobody"], correctAnswer: "— Both the user owner and group owners", explanation: "" },
  { id: 3400, text: "Question ID 619 To switch to another group, you must:", type: "single", options: ["Log off and log back in", "Log in as the staff user", "Be logged in graphically", "Be a member of the group that you are switching to"], correctAnswer: "Be a member of the group that you are switching to", explanation: "" },
  { id: 3401, text: "Question ID 630 The command, chmod 0777 /data will:", type: "single", options: ["Make the /data directory a setuid directory", "Make the /data directory a sticky bit directory", "Remove all special permissions", "Make the /data directory a setgid directory"], correctAnswer: "Remove all special permissions", explanation: "" },
  { id: 3402, text: "Question ID 634 Which of the following are mount options used for disk quotes? (choose two)", type: "multiple", options: ["userquota", "usrquota", "grpquota", "groupquota"], correctAnswer: ["usrquota", "grpquota"], explanation: "" },
  { id: 3403, text: "Question ID 637 Which command produces a list of users of groups and their quota statistics?", type: "single", options: ["quotarpt", "repquota", "warnquota", "quota"], correctAnswer: "repquota", explanation: "" },
  { id: 3404, text: "Question ID 654 Which command will remount the /data filesystem using the option from the /etc/fstab file?", type: "single", options: ["mount -o mount /data", "mount -o remount /dev/sda1 /data", "mount -o remount /data"], correctAnswer: "mount -o remount /data", explanation: "" },
  { id: 3405, text: "Question ID 663 If a user has exceeded the block soft quota and the grace period has expired, what happens?", type: "single", options: ["The soft limit becomes a hard limit until the user goes below the soft limit again", "The user will lose data, as files will be deleted automatically by the kernel.", "The question is invalid because users cannot exceed block soft quota limits", "Nothing, the user can still continue to use files as normal"], correctAnswer: "The soft limit becomes a hard limit until the user goes below the soft limit again", explanation: "" },
  { id: 3406, text: "Question ID 665 Which directories are typically writable to all users? (choose two)", type: "multiple", options: ["/tmp", "/home", "/var/tmp", "/"], correctAnswer: ["/tmp", "/var/tmp"], explanation: "" },
  { id: 3407, text: "Question ID 671 To activate a swap space that has been initialized, you can execute:", type: "single", options: ["swapoff", "swapon", "swapcontrol", "swapctl"], correctAnswer: "swapon", explanation: "" },
  { id: 3408, text: "Question ID 683 Which of the following commands will allow you to backup a partition table to a file and restore it at a later time?", type: "single", options: ["ddisk", "edisk", "sfdisk", "pdisk"], correctAnswer: "sfdisk", explanation: "" },
  { id: 3409, text: "Question ID 688 Which of the following commands will allow you to add a physical volume to an existing volume group?", type: "single", options: ["vgcreate", "vgextend", "vgreduce", "vgadd"], correctAnswer: "vgextend", explanation: "" },
  { id: 3410, text: "Question ID 697 If the command you used to unmount a partition fails, which commands can you use to check what is keeping the partition busy? (choose two)", type: "multiple", options: ["lsof", "chkdsk", "partchk", "fuser"], correctAnswer: ["lsof", "fuser"], explanation: "" },
  { id: 3411, text: "Question ID 698 What commands can display a list of mounted file systems? (choose two)", type: "multiple", options: ["lspt", "mount", "df", "fdisk"], correctAnswer: ["mount", "df"], explanation: "" },
  { id: 3412, text: "Question ID 699 The first field in the /etc/fstab file is used to specify:", type: "single", options: ["The mount options", "The dump level", "The filesystem type", "The device to mount", "The mount point", "The fsck order"], correctAnswer: "The device to mount", explanation: "" },
  { id: 3413, text: "Question ID 704 The sixth field in the /etc/fstab file is used to specify:", type: "single", options: ["The filesystem type", "The device to mount", "The mount point", "The fsck order", "The mount options", "The dump level"], correctAnswer: "The fsck order", explanation: "" },
  { id: 3414, text: "Question ID 710 Which of the following will mount an ISO file named cdrom.iso?", type: "single", options: ["mount -t cdrom cdrom.iso /mntb", "mount -t ufs cdrom.iso /mnt", "mount -o loopback cdrom.iso /mnt", "mount -o loop cdrom.iso /mnt"], correctAnswer: "mount -o loop cdrom.iso /mnt", explanation: "" },
  { id: 3415, text: "Question ID 729 Which option to the du command shows a summary of the space used in a directory structure?", type: "single", options: ["-s", "-h", "-x", "-all"], correctAnswer: "-s", explanation: "" },
  { id: 3416, text: "Question ID 730 What determines how many files can be stored in a filesystem?", type: "single", options: ["The number of bytes", "The Superblock size", "The number of inodes", "The number of data blocks"], correctAnswer: "The number of inodes", explanation: "" },
  { id: 3417, text: "Question ID 732 Which of the following commands will display information about the Superblock? (choose two)", type: "multiple", options: ["tune2fs", "init 0", "superblk -a", "dumpe2fs"], correctAnswer: ["tune2fs", "dumpe2fs"], explanation: "" },
  { id: 3418, text: "Question ID 743 The fsck utility uses which file to determine a filesystem type?", type: "single", options: ["/etc/system", "/etc/fsck", "/etc/fstab", "/etc/fsck.config"], correctAnswer: "/etc/fstab", explanation: "" },
  { id: 3419, text: "Question ID 746 Which command will allow you to determine where the backup superblock is for a filesystem?", type: "single", options: ["dumpe2fs", "e2fsck", "fsck", "superblk"], correctAnswer: "dumpe2fs", explanation: "" },
  { id: 3420, text: "Question ID 755 The output of the ls -l command includes /etc/grub.conf -> ../boot/grub/grub.conf . Based on this information, which is the soft link file?", type: "single", options: ["../boot/grub/grub.conf “ ”", "/etc/grub.conf", "Neither", "Both"], correctAnswer: "/etc/grub.conf", explanation: "" },
  { id: 3421, text: "Question ID 766 If you have 5 hard linked files and you delete four of them including the original one, then:", type: "single", options: ["You lose the data from the file", "The file still exists, but the data in the file is deleted", "The hard link count goes to 0", "The data is still available from the remaining file"], correctAnswer: "The data is still available from the remaining file", explanation: "" },
  { id: 3422, text: "Question ID 781 What directory is used as a temporary mount point?", type: "single", options: ["/mnt", "/tmpmnt", "/etc", "/xbin"], correctAnswer: "/mnt", explanation: "" },
  { id: 3423, text: "Question ID 792 Which command needs to be executed after modifying the LILO configuration file?", type: "single", options: ["reload", "redo", "modconfig", "lilo"], correctAnswer: "lilo", explanation: "" },
  { id: 3424, text: "Question ID 796 In GRUB Legacy, which directive is not typically used after a title directive? (choose one)", type: "single", options: ["initrd", "boot", "kernel", "root"], correctAnswer: "boot", explanation: "" },
  { id: 3425, text: "Question ID 816 The third stage of the boot process is:", type: "single", options: ["The kernel phase", "The init phase", "The firmware (BIOS/UEFI) stage", "The Bootloader (LILO/GRUB) stage"], correctAnswer: "The kernel phase", explanation: "" },
  { id: 3426, text: "Question ID 818 The bootloader (GRUB/LILO) loads which of the following components into memory? (choose two)", type: "multiple", options: ["The root filesystem", "The ramdisk", "The init process", "The kernel"], correctAnswer: ["The ramdisk", "The kernel"], explanation: "" },
  { id: 3427, text: "Question ID 825 Which runlevel number defines multi-user with no networking services?", type: "single", options: ["3", "0", "1", "5", "2", "6", "4"], correctAnswer: "2", explanation: "" },
  { id: 3428, text: "Question ID 834 Which of the following commands can be used to reboot the system? (choose two)", type: "multiple", options: ["shutdown", "reboot", "halt", "shutdown -r"], correctAnswer: ["reboot", "shutdown -r"], explanation: "" },
  { id: 3429, text: "Question ID 836 What two differences are there between querying an installed RPM and an RPM package file with the rpm command? (choose two)", type: "multiple", options: ["You must use the full filename when querying the package.", "You must use the full filename when querying the installed RPM.", "To query the package file, you have to add the -p option.", "To query the installed RPM, you have to add the -i option."], correctAnswer: ["You must use the full filename when querying the package.", "To query the package file, you have to add the -p option."], explanation: "" },
  { id: 3430, text: "Question ID 837 If you use the -f option when performing an rpm query:", type: "single", options: ["The command will output a list of the files in the packages.", "The command will display the full filename of the original package.", "The command output will wrap at half screen width.", "The command will show the package that owns a file."], correctAnswer: "The command will show the package that owns a file.", explanation: "" },
  { id: 3431, text: "Question ID 839 If you you have a RPM package file named, figlet-1.1-0.3.i686.rpm, which rpm commands will install it? (choose two)", type: "multiple", options: ["rpm -F figlet-1.1-0.3.i686.rpm", "rpm -U figlet-1.1-0.3.i686.rpm", "rpm -i figlet-1.1-0.3.i686.rpm", "rpm -e figlet-1.1-0.3.i686.rpm"], correctAnswer: ["rpm -U figlet-1.1-0.3.i686.rpm", "rpm -i figlet-1.1-0.3.i686.rpm"], explanation: "" },
  { id: 3432, text: "Question ID 840 The rpm2cpio command can be used to: (choose two)", type: "multiple", options: ["Extract files from a .rpm file “ ”", "List the content of a .rpm file “ ”", "Build a binary .rpm file from a source .src.rpm file", "Create a new .rpm file"], correctAnswer: ["Extract files from a .rpm file “ ”", "List the content of a .rpm file “ ”"], explanation: "" },
  { id: 3433, text: "Question ID 84“2 ” “ ” Which two directorie“s are ”automatically searched for shared libraries? (choose two)", type: "multiple", options: ["/usr/lib", "/lib", "/library", "/usr/library"], correctAnswer: ["/usr/lib", "/lib"], explanation: "" },
  { id: 3434, text: "Question ID 843 Which command will remove all files that belong to a Debian package?", type: "single", options: ["apt-get uninstall", "apt-get purge", "apt-get remove", "apt-get erase"], correctAnswer: "apt-get purge", explanation: "" },
  { id: 3435, text: "Question ID 845 Which command will update the list of available packages for APT?", type: "single", options: ["apt-get upgrade", "apt-get update", "apt-cache update", "apt-cache upgrade"], correctAnswer: "apt-get update", explanation: "" },
  { id: 3436, text: "Question ID 851 How can you determine the Debian package that owns a file?", type: "single", options: ["dpkg -S", "dpkg -f", "dpkg -o", "dpkg -i"], correctAnswer: "dpkg -S", explanation: "" },
  { id: 3437, text: "Question ID 856 Which command may be used to get a list of the installed Debian packages?", type: "single", options: ["apt-get list", "dpkg -L", "apt-get show", "dpkg -l"], correctAnswer: "dpkg -l", explanation: "" },
  { id: 3438, text: "Question ID 860 Which two commands will show detailed information about a Debian package? (choose two)", type: "multiple", options: ["apt-cache show", "dpkg -s", "apt-cache info", "dpkg -i"], correctAnswer: ["apt-cache show", "dpkg -s"], explanation: "" },
  { id: 3439, text: "Question ID 862 Which command is used to display the shared libraries of a dynamically linked executable?", type: "single", options: ["ldd", "ldlist", "ldconfig", "ld.so"], correctAnswer: "ldd", explanation: "" },
  { id: 3440, text: "Question ID 864 Which command will check the integrity of an RPM file?", type: "single", options: ["rpm -qKp", "rpm -qCp", "rpm -qcp", "rpm -qkp"], correctAnswer: "rpm -qKp", explanation: "" },
  { id: 3441, text: "Question ID 870 Which two characters do you use to tell the command that you are finished providing options and that the remaining data on the command line is arguments?", type: "single", options: ["**", "&&", "—", "||"], correctAnswer: "—", explanation: "" },
  { id: 3442, text: "Question ID 872 The _____ option to the uname command will display the kernel name.", type: "single", options: ["-s", "-x", "-n", "-k"], correctAnswer: "-s", explanation: "" },
  { id: 3443, text: "Question ID 876 Special file man pages are typically located in section ____.", type: "single", options: ["4", "2", "3", "1"], correctAnswer: "4", explanation: "" },
  { id: 3444, text: "Question ID 877 System Administration man pages are typically located in section ___.", type: "single", options: ["8", "6", "7", "9"], correctAnswer: "8", explanation: "" },
  { id: 3445, text: "Question ID 878 Shell command man pages are typically located in section ___.", type: "single", options: ["4", "1", "3", "2"], correctAnswer: "1", explanation: "" },
  { id: 3446, text: "Question ID 879 An absolute path always starts with which character?", type: "single", options: ["~", "/", "."], correctAnswer: "/", explanation: "" },
  { id: 3447, text: "Question ID 884 Which file can you place in your home directory to be executed when you log off the system?", type: "single", options: ["~/.bashrc", "/etc/bashrc", "~/.bash_profile", "~/.bash_logout"], correctAnswer: "~/.bash_logout", explanation: "" },
  { id: 3448, text: "Question ID 886 The _____ command will list the commands that are running in your terminal.", type: "single", options: ["ls", "ps", "proc", "list"], correctAnswer: "ps", explanation: "" },
  { id: 3449, text: "Question ID 890 To set a priority value lower than 0, you must log in as which user?", type: "single", options: ["The root user", "Any user account", "No user can specify a priority lower than 0", "The adm user"], correctAnswer: "The root user", explanation: "" },
  { id: 3450, text: "Question ID 894 Which glob character matches exactly one character ?", type: "single", options: ["[", "* “ ”", "?", "."], correctAnswer: "?", explanation: "" },
  { id: 3451, text: "Question ID 898 By default, using the touch command on an existing file will update the files _____.", type: "single", options: ["Type", "Permissions", "Timestamp", "Ownership"], correctAnswer: "Timestamp", explanation: "" },
  { id: 3452, text: "Question ID 907 Which option to the find command will execute a command on each matching file without prompting the user?", type: "single", options: ["-ok", "-print", "-ls", "-exec"], correctAnswer: "-exec", explanation: "" },
  { id: 3453, text: "Question ID 909 Which option to the find command will search by name using a case-insensitive match?", type: "single", options: ["-inum", "-insen", "-iname", "-i"], correctAnswer: "-iname", explanation: "" },
  { id: 3454, text: "Question ID 910 Which of the following commands will take the standard output of the ls and put it into the /tmp/output.txt file:", type: "single", options: ["ls | /tmp/output.txt", "ls 2 | /tmp/output", "ls 2> /tmp/output.txt", "ls > /tmp/output.txt"], correctAnswer: "ls > /tmp/output.txt", explanation: "" },
  { id: 3455, text: "Question ID 914 The ____ option can be used with the edquota command to copy the quota limits from one user account to another.", type: "single", options: ["-u", "-c", "-p", "-d"], correctAnswer: "-p", explanation: "" },
  { id: 3456, text: "Question ID 922 A system that contains Linux as well as a Microsoft Windows operating system is called a:", type: "single", options: ["Multi environment system", "This sort of system cannot exist", "Dual boot system", "A file base system"], correctAnswer: "Dual boot system", explanation: "" },
  { id: 3457, text: "Question ID 923 In what directory are you most likely to find users home directories?", type: "single", options: ["/home", "/usr/third", "/var/lib", "/usr/local"], correctAnswer: "/home", explanation: "" },
  { id: 3458, text: "Question ID 924 Virtual memory is also referred to as:", type: "single", options: ["Swap memory", "Test memory", "Hard memory", "Soft memory"], correctAnswer: "Swap memory", explanation: "" },
  { id: 3459, text: "Question ID 925 Which directory structure has directories which may have heavy activity for services like mail, ftp, httpd and printing?", type: "single", options: ["/var", "/rootfs", "/root", "/home"], correctAnswer: "/var", explanation: "" },
  { id: 3460, text: "Question ID 933 After running fdisk -cu /dev/sdb, what fdisk command will allow you to save changes and quit?", type: "single", options: ["q", "w", "f", "g"], correctAnswer: "w", explanation: "" },
  { id: 3461, text: "Question ID 934 Which command is used to create a logical volume?", type: "single", options: ["lvadd", "createlv", "create", "lvcreate"], correctAnswer: "lvcreate", explanation: "" },
  { id: 3462, text: "Question ID 956 Which option to the tune2fs command will change the space reserved for system use?", type: "single", options: ["-M", "-r", "-R", "-m"], correctAnswer: "-m", explanation: "" },
  { id: 3463, text: "Question ID 960 Which option to the du command will allow you to specify a subdirectory to not include in the results?", type: "single", options: ["exclude –", "noinclude", "-e", "–-x"], correctAnswer: "exclude –", explanation: "" },
  { id: 3464, text: "Question ID 968 Which option to the fsck command forces a system check?", type: "single", options: ["-f", "-FF", "-F", "-ff"], correctAnswer: "-f", explanation: "" },
  { id: 3465, text: "Question ID 969 Which option to the fsck command will allow you to specify the filesystem type?", type: "single", options: ["-T", "-f", "-F", "-t"], correctAnswer: "-t", explanation: "" },
  { id: 3466, text: "Question ID 970 Which option to the e2fsck command allows you to specify an alternative superblock?", type: "single", options: ["-a", "-d", "-b", "-c"], correctAnswer: "-b", explanation: "" },
  { id: 3467, text: "Question ID 973 Which type of link can be made to a file on another filesystem, hard or soft?", type: "single", options: ["hard", "soft"], correctAnswer: "soft", explanation: "" },
  { id: 3468, text: "Question ID 974 Which type of link can be made to directories, hard or soft?", type: "single", options: ["hard", "soft"], correctAnswer: "soft", explanation: "" },
  { id: 3469, text: "Question ID 978 When viewing a file with the ls -l command, which character represents a file type of soft link?", type: "single", options: ["– l", "d", "f"], correctAnswer: "– l", explanation: "" },
  { id: 3470, text: "Question ID 981 Which directory is used to store the kernel?", type: "single", options: ["/kernel", "/", "/etc", "/boot"], correctAnswer: "/boot", explanation: "" },
  { id: 3471, text: "Question ID 982 Which directory is used to store temporary files?", type: "single", options: ["/etc", "/temp", "/", "/tmp"], correctAnswer: "/tmp", explanation: "" },
  { id: 3472, text: "Question ID 987 What is the full path to the LILO configuration file?", type: "single", options: ["/boot/lilo.conf", "/etc/lilo.conf", "/var/lilo", "/etc/lilo"], correctAnswer: "/etc/lilo.conf", explanation: "" },
  { id: 3473, text: "Question ID 988 To use an encrypted password in the GRUB Legacy configuration file, use the _____ option to the password directive.", type: "single", options: ["crypt", "secure", "–encrypt", "– – md5 –"], correctAnswer: "– – md5 –", explanation: "" },
  { id: 3474, text: "Question ID 990 The primary configuration file for the GRUB 2 on a Fedora system is _____.", type: "single", options: ["/boot/grub/grub.cfg", "/boot/grub2/grub.cfg", "/boot/grub2.cfg", "/boot/grub/grub2.cfg"], correctAnswer: "/boot/grub2/grub.cfg", explanation: "" },
  { id: 3475, text: "Question ID 1004 The first process that the kernel launches is called the _____ process.", type: "single", options: ["init", "startx", "kernel", "sys"], correctAnswer: "init", explanation: "" },
  { id: 3476, text: "Question ID 1005 The program that first starts the boot process is called the _____.", type: "single", options: ["boot", "bootloader", "start", "exec"], correctAnswer: "bootloader", explanation: "" },
  { id: 3477, text: "Question ID 1012 Which of the following are benefits of a shared library: (choose two)", type: "multiple", options: ["Programs can be smaller", "Programs run faster", "Programs use a more consistent base of code", "Programs run slower"], correctAnswer: ["Programs can be smaller", "Programs use a more consistent base of code"], explanation: "" },
  { id: 3478, text: "Question ID 1014 Which of the following contents is in the ldconfig configuration file by default?", type: "single", options: ["include /etc/ldconfig", "include ldconfig", "include all", "include ld.so.conf.d/*.conf"], correctAnswer: "include ld.so.conf.d/*.conf", explanation: "" },
  { id: 3479, text: "Question ID 1015 Which of the following commands would display the libraries used by the /bin/ls command?", type: "single", options: ["ldd /bin/ls", "ls -lib /bin/ls", "ldconfig /bin/ls", "listlib /bin/ls"], correctAnswer: "ldd /bin/ls", explanation: "" },
  { id: 3480, text: "Question ID 1019 The same set of services are started or stopped at different runlevels. True or False?", type: "single", options: ["True", "False"], correctAnswer: "False", explanation: "" },
  { id: 3481, text: "Question ID 1024 Which is the default runlevel for Debian based Linux systems?", type: "single", options: ["3", "2", "5", "4"], correctAnswer: "2", explanation: "" },
  { id: 3482, text: "Question ID 1028 Which of the following is not a Linux boot system?", type: "single", options: ["bootup", "init", "upstart", "systemd"], correctAnswer: "bootup", explanation: "" },
  { id: 3483, text: "Question ID 1029 Which file is overwritten at the end of each boot process with the messages that were generated while booting?", type: "single", options: ["/var/log/dmesg", "/var/log/dmsg", "/var/msg/dmesg", "/var/tmp/dmesg"], correctAnswer: "/var/log/dmesg", explanation: "" },
  { id: 3484, text: "Question ID 1035 Which command is used to view the summary of the RAM and swap space?", type: "single", options: ["lsmem", "du", "iostat", "free"], correctAnswer: "free", explanation: "" },
  { id: 3485, text: "Question ID 1038 Coldplug devices are devices that are connected when the power is off. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 3486, text: "Question ID 1042 Which of the following commands is used to view the network interface controller connected on the PCI bus?", type: "single", options: ["lspci", "lsmod", "lsusb", "lsnet"], correctAnswer: "lspci", explanation: "" },
  { id: 3487, text: "Question ID 1047 HALD is the abbreviation for:", type: "single", options: ["Hardware Attribute Layer Daemon", "Hardware Availability Layer Daemon", "Hardware Abstraction Layer Driver", "Hardware Abstraction Layer Daemon"], correctAnswer: "Hardware Abstraction Layer Daemon", explanation: "" },
  { id: 3488, text: "Question ID 1048 What is the notification mechanism used to inform programs about a change in state of hardware devices?", type: "single", options: ["HALD uses dbus to send notifications", "Programs query HALD directly", "DBUS forwards queries from programs to HALD", "DBUS sends notifications to HALD"], correctAnswer: "HALD uses dbus to send notifications", explanation: "" }
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [secretPasswordInput, setSecretPasswordInput] = useState('');
  const [secretPasswordError, setSecretPasswordError] = useState(false);
  const [showSecretPrompt, setShowSecretPrompt] = useState(false);

  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

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
    const data = selectedQuizId === 'quiz1' ? quiz1Data : selectedQuizId === 'quiz2' ? quiz2Data : secretQuizData;
    setActiveQuestions(shuffleArray(data));
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setCheckedQuestions([]);
    setShowResults(false);
  };

  const retakeMissed = () => {
    const missed = activeQuestions.filter(q => !checkAnswer(q.id));
    if (missed.length > 0) {
      setActiveQuestions(shuffleArray(missed));
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

  const getOptionStyles = (option) => {
    const isSelected = question.type === 'multiple' 
      ? (userAnswers[question.id] || []).includes(option)
      : userAnswers[question.id] === option;
    
    if (!isChecked) {
      return isSelected 
        ? 'border-blue-500 shadow-sm bg-blue-50 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100' 
        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700';
    }

    const isCorrectOption = question.type === 'multiple'
      ? question.correctAnswer.includes(option)
      : question.correctAnswer === option;

    if (isCorrectOption) {
      return 'font-medium border-green-500 bg-green-50 dark:bg-green-900/40 text-green-800 dark:text-green-300';
    }
    if (isSelected && !isCorrectOption) {
      return 'font-medium line-through decoration-red-400 opacity-80 border-red-500 bg-red-50 dark:bg-red-900/40 text-red-800 dark:text-red-300';
    }
    
    return 'opacity-50 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400';
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'krfxK6') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleSelectQuiz = (quizId) => {
    if (quizId === 'secret') {
      setShowSecretPrompt(true);
      setSecretPasswordInput('');
      setSecretPasswordError(false);
      return;
    }
    const data = quizId === 'quiz1' ? quiz1Data : quiz2Data;
    setSelectedQuizId(quizId);
    setActiveQuestions(shuffleArray(data));
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setCheckedQuestions([]);
    setShowResults(false);
  };

  const handleSecretPassword = (e) => {
    e.preventDefault();
    if (secretPasswordInput === 'krfxEXAMk6') {
      setShowSecretPrompt(false);
      setSelectedQuizId('secret');
      setActiveQuestions(shuffleArray(secretQuizData));
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setCheckedQuestions([]);
      setShowResults(false);
    } else {
      setSecretPasswordError(true);
    }
  };

  const exitQuiz = () => {
    setSelectedQuizId(null);
    setShowResults(false);
  };

  const isCurrentCorrect = isChecked && checkAnswer(question?.id);

  if (showSecretPrompt) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-md w-full rounded-2xl shadow-xl overflow-hidden p-8 text-center bg-white dark:bg-gray-800 transition-colors">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-purple-100 dark:bg-purple-900/50">
            <Lock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">SECRET Quiz</h1>
          <p className="mb-8 text-gray-600 dark:text-gray-400">Restricted module access.</p>
          <form onSubmit={handleSecretPassword} className="space-y-4">
            <div>
              <input
                type="password"
                value={secretPasswordInput}
                onChange={(e) => setSecretPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className={`w-full p-4 border rounded-xl text-lg outline-none transition-all text-gray-900 dark:text-white ${secretPasswordError ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600 focus:ring-purple-500 bg-white dark:bg-gray-700'}`}
              />
              {secretPasswordError && <p className="text-red-500 text-sm mt-2 text-left">Access denied.</p>}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setShowSecretPrompt(false)} className="flex-1 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-xl transition-colors text-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                Cancel
              </button>
              <button type="submit" className="flex-1 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors text-lg">
                Unlock
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-md w-full rounded-2xl shadow-xl overflow-hidden p-8 text-center bg-white dark:bg-gray-800 transition-colors">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-blue-100 dark:bg-blue-900/50">
            <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Linux Exam Prep</h1>
          <p className="mb-8 text-gray-600 dark:text-gray-400">Authentication required for practice materials.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter access code..."
              className={`w-full p-4 border rounded-xl text-lg outline-none transition-all ${loginError ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white'}`}
            />
            <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors text-lg shadow-md">
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!selectedQuizId) {
    return (
      <div className="p-4 md:p-8 min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 mt-8 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Study Dashboard</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">Prepare for the exam by completing these modules.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <button onClick={() => handleSelectQuiz('quiz1')} className="group rounded-2xl p-6 text-left shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-transparent bg-white dark:bg-gray-800 hover:border-blue-500">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-100 dark:bg-blue-900/50">
                  <span className="font-bold text-xl text-blue-600 dark:text-blue-400">1</span>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">QUIZ 1</h2>
              <p className="mb-4 text-gray-600 dark:text-gray-400">OS Fundamentals & Shell basics</p>
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {quiz1Data.length} Questions
              </span>
            </button>

            <button onClick={() => handleSelectQuiz('quiz2')} className="group rounded-2xl p-6 text-left shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-transparent bg-white dark:bg-gray-800 hover:border-amber-500">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-amber-100 dark:bg-amber-900/50">
                  <span className="font-bold text-xl text-amber-600 dark:text-amber-400">2</span>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-amber-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">QUIZ 2</h2>
              <p className="mb-4 text-gray-600 dark:text-gray-400">Pipelines, Redirection & Scheduling</p>
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {quiz2Data.length} Questions
              </span>
            </button>

            <button onClick={() => handleSelectQuiz('secret')} className="group rounded-2xl p-6 text-left shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-transparent bg-white dark:bg-gray-800 hover:border-purple-500">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-100 dark:bg-purple-900/50">
                  <Lock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-purple-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">SECRET</h2>
              <p className="mb-4 text-gray-600 dark:text-gray-400">IDK</p>
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {secretQuizData.length} Questions
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / activeQuestions.length) * 100);
    const hasMissed = score < activeQuestions.length;

    return (
      <div className="p-4 md:p-8 min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto rounded-2xl shadow-xl overflow-hidden bg-white dark:bg-gray-800 transition-colors">
          <div className="p-8 text-center text-white relative bg-blue-600 dark:bg-blue-800">
            <button onClick={exitQuiz} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors">
              <Home className="w-6 h-6" />
            </button>
            <Award className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Quiz Results</h1>
            <p className="text-xl">Score: {score} / {activeQuestions.length} ({percentage}%)</p>
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
                      <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white whitespace-pre-wrap">Q{idx + 1}: {q.text}</h3>
                      <p className="text-sm">
                        <span className="font-bold text-gray-600 dark:text-gray-400">Answer: </span>
                        <span className={isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}>
                          {q.type === 'multiple' ? (userAnswers[q.id]?.join(', ') || 'None') : (userAnswers[q.id] || 'None')}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-sm mt-1">
                          <span className="font-bold text-gray-600 dark:text-gray-400">Correct: </span>
                          <span className="text-green-700 dark:text-green-400">
                            {q.type === 'multiple' ? q.correctAnswer.join(', ') : q.correctAnswer}
                          </span>
                        </p>
                      )}
                      {q.explanation && (
                        <div className="mt-3 text-sm p-3 rounded border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                          <span className="font-bold text-blue-600">Note:</span> {q.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-6 border-t flex flex-wrap justify-center gap-4 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <button onClick={restartQuiz} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-sm">
              <RotateCcw className="w-5 h-5" /> Retake All
            </button>
            {hasMissed && (
              <button onClick={retakeMissed} className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 shadow-sm">
                <RefreshCw className="w-5 h-5" /> Retake Missed
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="flex items-center justify-center p-4 min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-3xl w-full rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-[500px] bg-white dark:bg-gray-800 transition-colors">
        <div className="text-white p-6 relative bg-blue-600 dark:bg-blue-800 shadow-lg">
          <button onClick={exitQuiz} className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/20 transition-colors">
            <Home className="w-5 h-5" />
          </button>
          <div className="flex justify-between items-center mb-4 pr-16">
            <h2 className="text-xl font-bold">
              {selectedQuizId === 'quiz1' ? 'Essentials' : selectedQuizId === 'quiz2' ? 'Operations' : '🔒 Hardware'}
            </h2>
            <span className="font-medium px-3 py-1 rounded-full text-sm bg-blue-700">
              Q{currentQuestionIndex + 1} / {activeQuestions.length}
            </span>
          </div>
          <div className="w-full rounded-full h-2 bg-blue-800">
            <div className="bg-green-400 h-2 rounded-full transition-all duration-300" style={{ width: `${((currentQuestionIndex) / activeQuestions.length) * 100}%` }}></div>
          </div>
        </div>

        <div className="p-8 flex-1 flex flex-col">
          <h3 className="text-2xl font-semibold mb-6 leading-snug text-gray-900 dark:text-white whitespace-pre-wrap">
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
                  className="w-5 h-5 focus:ring-blue-500 text-blue-600 border-gray-300 dark:bg-gray-700"
                />
                <span className="ml-3 text-lg">{option}</span>
              </label>
            ))}

            {question.type === 'multiple' && (
              <>
                <p className="text-sm font-medium mb-3 text-blue-600 dark:text-blue-400">Select all that apply:</p>
                {question.options.map((option, idx) => {
                  const isOptionChecked = (userAnswers[question.id] || []).includes(option);
                  return (
                    <label key={idx} className={`flex items-center p-4 border rounded-xl transition-all ${isChecked ? 'cursor-default' : 'cursor-pointer'} ${getOptionStyles(option)}`}>
                      <input 
                        type="checkbox" 
                        checked={isOptionChecked}
                        onChange={() => handleMultiSelect(option)}
                        disabled={isChecked}
                        className="w-5 h-5 rounded focus:ring-blue-500 text-blue-600"
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
                  placeholder="Type answer here..."
                  className={`w-full p-4 border rounded-xl text-lg outline-none transition-all ${isChecked ? (isCurrentCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500') : 'border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'}`}
                />
              </div>
            )}
            
            {isChecked && (
              <div className={`mt-6 p-5 rounded-xl border-l-4 shadow-md ${isCurrentCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                <div className="flex items-start gap-4">
                  {isCurrentCorrect ? <CheckCircle2 className="w-8 h-8 text-green-600" /> : <XCircle className="w-8 h-8 text-red-600" />}
                  <div>
                    <h4 className={`text-lg font-bold ${isCurrentCorrect ? 'text-green-800' : 'text-red-800'}`}>
                      {isCurrentCorrect ? 'Correct!' : 'Incorrect'}
                    </h4>
                    {!isCurrentCorrect && (
                      <p className="mt-2 font-medium">Answer: {Array.isArray(question.correctAnswer) ? question.correctAnswer.join(', ') : question.correctAnswer}</p>
                    )}
                    {question.explanation && <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{question.explanation}</p>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t flex justify-between items-center bg-gray-50 dark:bg-gray-800">
          <button onClick={prevQuestion} disabled={currentQuestionIndex === 0} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-colors ${currentQuestionIndex === 0 ? 'text-gray-400 dark:text-gray-600' : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300'}`}>
            <ArrowLeft className="w-5 h-5" /> Previous
          </button>
          
          {!isChecked ? (
            <button onClick={handleCheckQuestion} disabled={!isCurrentQuestionAnswered()} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all shadow-md ${isCurrentQuestionAnswered() ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-gray-300 text-gray-500'}`}>
              Check Answer
            </button>
          ) : (
            <button onClick={nextQuestion} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-md">
              {currentQuestionIndex === activeQuestions.length - 1 ? 'Show Results' : 'Next Question'} <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}