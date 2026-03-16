import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, RotateCcw, Award, RefreshCw, Home, Lock, ChevronRight, BookOpen, Palette } from 'lucide-react';

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
    text: "Which of the following commands will produce the same result as checking hard disk MBR partitions? (choose three)",
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
    explanation: "A `for` loop is used to iterate over a list of items, such as files matched by a glob (*.txt). The loop block is closed with the `done` keyword."
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
    explanation: "When globstar is activated (using `shopt -s globstar`), the `**` pattern matches all files and zero or more directories and subdirectories recursively."
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
    explanation: "Parsing the output of `ls` is a major Bash anti-pattern. If any filename contains spaces or special characters, word splitting will cause `rm` to delete the wrong files, creating a massive safety risk."
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
    explanation: "To count frequencies: first `sort` to group identical words, then `uniq -c` to count them, and finally `sort -nr` (numeric, reverse) to order them from highest count to lowest."
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
    explanation: "The `&>` operator is a Bash shortcut that redirects both standard output (stdout, descriptor 1) and standard error (stderr, descriptor 2) to the same location."
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
    explanation: "In Bash extended globbing (extglob), `!(pattern)` is used to match anything that does NOT match the given pattern."
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
    explanation: "Lossless compression is required for text and data where every exact bit must be preserved (like a log file). Movies, MP3s, and JPEGs generally use lossy compression to save space."
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
    explanation: "A process is in the 'waiting' (or blocked) state because it is waiting for some event like I/O. Once that event occurs, it transitions back to 'ready' to wait for CPU time."
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
    explanation: "`xargs` reads items from standard input (usually piped from another command like `find`) and builds/executes commands with those items as arguments."
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
    explanation: "Process execution consists of a cycle of CPU execution and I/O wait. The period of active, continuous CPU execution is called a CPU burst."
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
    explanation: "Both `source ~/.bashrc` and `. ~/.bashrc` execute the file within the context of the current shell session. `bash ~/.bashrc` would run it in a new child shell."
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
    explanation: "UNIX was born at AT&T's Bell Labs in 1969. Linus Torvalds released the first version of the Linux kernel in 1991."
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
    explanation: "`export` makes the variable available to child processes. `bash -c` executes a command string in a new subshell, proving the variable was inherited."
  },
  {
    id: 114,
    text: "Which command displays lines 5-10 from a file?",
    type: "single",
    options: [
      "head -n 10 file | tail -n 6",
      "sed -n '5,10p' file (also correct but not using head/tail)",
      "tail -n 10 file | head -n 6",
      "cat file | lines 5-10"
    ],
    correctAnswer: "head -n 10 file | tail -n 6",
    explanation: "`head -n 10` grabs the first 10 lines. Piping that into `tail -n 6` grabs the last 6 lines of that chunk (lines 5, 6, 7, 8, 9, 10), perfectly extracting the requested range."
  },
  {
    id: 115,
    text: "What command removes consecutive duplicate lines from sorted input?\n\nEnter the command name only.",
    type: "text",
    correctAnswer: "uniq",
    explanation: "The `uniq` command filters out repeated lines in a file. It only detects duplicates if they are adjacent, which is why the input must be sorted first."
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
    explanation: "In bracket expressions, a caret `^` (or an exclamation mark `!`) at the very beginning negates the set, meaning it matches any one character that is NOT listed."
  },
  {
    id: 117,
    text: "What is the name of the scheduling algorithm that selects the process with the shortest next CPU burst? \n\n(Note: The test platform options for this question mismatched the prompt, listing consequences instead of names.)",
    type: "single",
    options: [
      "The algorithm degrades into FCFS behavior (this happens when quantum is too LARGE)",
      "Physical memory consumption increases due to frequent swapping",
      "Context switch overhead increases significantly",
      "Processes enter starvation and never get enough CPU time"
    ],
    correctAnswer: "Processes enter starvation and never get enough CPU time",
    explanation: "Shortest Job First (SJF) selects the shortest burst. A major consequence/disadvantage of SJF is that long processes can suffer from starvation if short processes keep arriving."
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
    explanation: "SJF (Shortest Job First) is mathematically optimal for minimizing waiting time, but because we can't see the future, the next CPU burst length must be predicted/estimated."
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
    explanation: "`cut` is used to extract sections (like columns or fields) from each line of input, typically using a delimiter (like a comma or colon)."
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
    explanation: "The `-r` (recursive) flag is required for `zip` to traverse into the Documents directory and include all of its files and subdirectories."
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
    explanation: "`killall` allows you to terminate processes by specifying their exact name (e.g., `killall firefox`) rather than their PID."
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
    explanation: "In POSIX systems (like Linux), an exit code of 0 always indicates that the command executed successfully without errors."
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
    explanation: "`&&` is a logical AND (cmd2 runs if cmd1 succeeds). `||` is a logical OR (cmd2 acts as a fallback and runs only if cmd1 fails)."
  },
  {
    id: 124,
    text: "Which of the following is not a valid way to send the force kill signal to a process?",
    type: "single",
    options: [
      "kill -FORCE PID",
      "kill -SIGKILL PID",
      "kill -9 PID",
      "kill -KILL PID"
    ],
    correctAnswer: "kill -FORCE PID",
    explanation: "`-FORCE` is not a valid signal name. The force kill signal (SIGKILL) can be sent with `kill -9 PID`, `kill -SIGKILL PID`, or `kill -KILL PID`."
  },
  {
    id: 125,
    text: "In Bash, ______ exits the current loop entirely, while ______ skips to the next iteration.",
    type: "single",
    options: [
      "break / continue",
      "continue / break",
      "exit / skip",
      "stop / next"
    ],
    correctAnswer: "break / continue",
    explanation: "`break` terminates the loop completely and execution continues after the `done` keyword. `continue` skips the rest of the current iteration and jumps to the next one."
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
    explanation: "The flags for this task are: `c` (create), `j` (bzip2 compression), `f` (specify filename). The output file comes before the source directory: `tar -cjf documents.tbz Documents`."
  },
  {
    id: 127,
    text: "Complete the command sequence to save the process list and then count how many lines match `python`:\n\nps aux > procs.log; grep python procs.log | ______ -l",
    type: "single",
    options: [
      "wc",
      "cut",
      "awk",
      "sort",
      "uniq"
    ],
    correctAnswer: "wc",
    explanation: "`wc -l` counts the number of lines. After grepping for 'python', piping to `wc -l` gives the count of matching lines."
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
    explanation: "The `-u` flag in `set -euo pipefail` treats unset variables as an error. Referencing `${UNDEFINED_VAR}` will cause the script to immediately exit with an 'unbound variable' error."
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
    explanation: "`gzip` compresses the file in place. By default it removes the original and creates a `.gz` file. So `myfile.tar` is deleted and `myfile.tar.gz` is created."
  },
  {
    id: 130,
    text: "Waiting time is calculated as:",
    type: "single",
    options: [
      "Priority level",
      "CPU burst length",
      "Memory requirements",
      "Order of arrival in ready queue"
    ],
    correctAnswer: "Order of arrival in ready queue",
    explanation: "Waiting time is the total time a process spends waiting in the ready queue before it gets CPU time. It is determined by the order of arrival and the scheduling algorithm."
  },
  {
    id: 131,
    text: "Which redirection writes a command's standard error (stderr) to `errors.log`, overwriting the file if it already exists, while leaving standard output (stdout) on the terminal?",
    type: "single",
    options: [
      "command 2>> errors.log",
      "command 2> errors.log",
      "command > errors.log",
      "command &> errors.log"
    ],
    correctAnswer: "command 2> errors.log",
    explanation: "`2>` redirects file descriptor 2 (stderr) to a file, overwriting it. `2>>` would append. `>` redirects stdout only. `&>` redirects both stdout and stderr."
  },
  {
    id: 132,
    text: "Complete the pipeline to count how many unique user names appear in `/etc/passwd`:\n\ngrep -d: -f1 /etc/passwd | awk | cut | ______ | ______ | ______",
    type: "single",
    options: [
      "wc -l / sort",
      "sort / uniq -c / sort -nr",
      "sort / uniq / wc -l",
      "uniq -c / sort -nr / wc -w"
    ],
    correctAnswer: "sort / uniq / wc -l",
    explanation: "To count unique usernames: `sort` to bring duplicates together, `uniq` to collapse them, then `wc -l` to count the resulting unique lines."
  },
  {
    id: 133,
    text: "Which versions of regular expression syntax are commonly distinguished? (Select all that apply)",
    type: "multiple",
    options: [
      "There is only one standard syntax",
      "The syntax depends on the specific tool being used",
      "BRE and ERE are the same",
      "Basic (BRE), Extended (ERE), Perl Compatible (PCRE)"
    ],
    correctAnswer: [
      "The syntax depends on the specific tool being used",
      "Basic (BRE), Extended (ERE), Perl Compatible (PCRE)"
    ],
    explanation: "Regex has multiple flavours: BRE (Basic), ERE (Extended, used with `grep -E` or `egrep`), and PCRE (Perl Compatible, used in many modern languages). Different tools support different flavours."
  }
];

const secretQuizData = [
  { id: 2001, text: "What does CLI stand for?", type: "single", options: ["Core Learning Interface", "Command Learning Interface", "Core Line Interface", "Command Line Interface"], correctAnswer: "Command Line Interface", explanation: "" },
  { id: 2002, text: "Commands are case-sensitive. True or False?", type: "single", options: ["True", "False"], correctAnswer: "True", explanation: "" },
  { id: 2003, text: "When entering a command, do arguments or options typically come first?", type: "single", options: ["Options", "Arguments"], correctAnswer: "Options", explanation: "" },

  { id: 3486, text: "Question ID 1042 Which of the following commands is used to view the network interface controller connected on the PCI bus?", type: "single", options: ["lspci", "lsmod", "lsusb", "lsnet"], correctAnswer: "lspci", explanation: "" },
  { id: 3487, text: "Question ID 1047 HALD is the abbreviation for:", type: "single", options: ["Hardware Attribute Layer Daemon", "Hardware Availability Layer Daemon", "Hardware Abstraction Layer Driver", "Hardware Abstraction Layer Daemon"], correctAnswer: "Hardware Abstraction Layer Daemon", explanation: "" },
  { id: 3488, text: "Question ID 1048 What is the notification mechanism used to inform programs about a change in state of hardware devices?", type: "single", options: ["HALD uses dbus to send notifications", "Programs query HALD directly", "DBUS forwards queries from programs to HALD", "DBUS sends notifications to HALD"], correctAnswer: "HALD uses dbus to send notifications", explanation: "" }
];

export default function App() {
  const [theme, setTheme] = useState('default'); // 'default' or 'kindle'
  
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

    const isCorrectOption = question.type === 'multiple'
      ? question.correctAnswer.includes(option)
      : question.correctAnswer === option;
    
    if (theme === 'kindle') {
      if (!isChecked) {
        return isSelected 
          ? 'border-4 border-black bg-gray-200 text-black font-bold' 
          : 'border-2 border-black bg-white text-black';
      }
      if (isCorrectOption) return 'border-4 border-black bg-black text-white font-bold';
      if (isSelected && !isCorrectOption) return 'border-[3px] border-black border-dashed bg-white text-black line-through opacity-70';
      return 'border-2 border-gray-400 bg-white text-gray-500 opacity-50';
    } else {
      // Default theme styles
      if (!isChecked) {
        return isSelected 
          ? 'border-blue-500 shadow-sm bg-blue-50 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100' 
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700';
      }
      if (isCorrectOption) return 'font-medium border-green-500 bg-green-50 dark:bg-green-900/40 text-green-800 dark:text-green-300';
      if (isSelected && !isCorrectOption) return 'font-medium line-through decoration-red-400 opacity-80 border-red-500 bg-red-50 dark:bg-red-900/40 text-red-800 dark:text-red-300';
      return 'opacity-50 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400';
    }
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
    if (data.length === 0) {
      alert("QUIZ 2 is currently empty. Questions will be added later!");
      return;
    }
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

  // Reusable theme switch button to inject in every view
  const themeToggleButton = (
    <div className="absolute top-4 right-4 z-50">
      <button
        onClick={() => setTheme(t => t === 'default' ? 'kindle' : 'default')}
        className={`p-3 rounded flex items-center gap-2 transition-transform ${
          theme === 'kindle' 
            ? 'bg-white text-black border-2 border-black active:bg-black active:text-white' 
            : 'bg-indigo-600 text-white hover:bg-indigo-700 rounded-full shadow-lg'
        }`}
      >
        {theme === 'kindle' ? <Palette className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
        <span className="font-bold hidden sm:inline">
          {theme === 'kindle' ? 'Color' : 'Kindle'}
        </span>
      </button>
    </div>
  );

  if (showSecretPrompt) {
    return (
      <div className={theme === 'kindle' 
        ? "flex items-center justify-center min-h-screen p-4 bg-white text-black font-serif relative"
        : "flex items-center justify-center min-h-screen p-4 transition-colors duration-300 bg-gray-100 dark:bg-gray-900 relative"
      }>
        {themeToggleButton}
        <div className={theme === 'kindle'
          ? "max-w-md w-full border-4 border-black rounded-lg p-8 text-center bg-white"
          : "max-w-md w-full rounded-2xl shadow-xl overflow-hidden p-8 text-center bg-white dark:bg-gray-800 transition-colors duration-300"
        }>
          <div className={theme === 'kindle'
            ? "w-16 h-16 rounded-full border-2 border-black flex items-center justify-center mx-auto mb-6 bg-white"
            : "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-purple-100 dark:bg-purple-900/50"
          }>
            <Lock className={`w-8 h-8 ${theme === 'kindle' ? 'text-black' : 'text-purple-600 dark:text-purple-400'}`} />
          </div>
          <h1 className={theme === 'kindle'
            ? "text-2xl font-bold mb-2 text-black uppercase tracking-wide"
            : "text-2xl font-bold mb-2 text-gray-800 dark:text-white"
          }>
            Secret Quiz
          </h1>
          <p className={theme === 'kindle'
            ? "mb-8 text-black font-medium text-lg"
            : "mb-8 text-gray-600 dark:text-gray-400"
          }>
            Enter password to unlock
          </p>
          <form onSubmit={handleSecretPassword} className="space-y-6">
            <div>
              <input
                type="password"
                value={secretPasswordInput}
                onChange={(e) => setSecretPasswordInput(e.target.value)}
                placeholder="Password"
                className={theme === 'kindle'
                  ? `w-full p-4 border-4 rounded-none text-2xl outline-none text-black bg-white ${secretPasswordError ? 'border-dashed border-black' : 'border-black'}`
                  : `w-full p-4 border rounded-xl text-lg outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${secretPasswordError ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-purple-500 bg-white dark:bg-gray-700'}`
                }
              />
              {secretPasswordError && (
                <p className={theme === 'kindle' ? "text-black font-bold text-lg mt-3 text-left uppercase" : "text-red-500 text-sm mt-2 text-left"}>
                  Incorrect password
                </p>
              )}
            </div>
            <div className="flex gap-4">
              <button type="button" onClick={() => setShowSecretPrompt(false)} className={theme === 'kindle'
                ? "flex-1 py-4 border-4 border-black text-black font-bold text-xl uppercase tracking-wider active:bg-black active:text-white"
                : "flex-1 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-xl transition-colors text-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              }>
                Cancel
              </button>
              <button type="submit" className={theme === 'kindle'
                ? "flex-1 py-4 bg-black text-white font-bold text-xl uppercase tracking-wider active:bg-white active:text-black border-4 border-black"
                : "flex-1 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors text-lg"
              }>
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
      <div className={theme === 'kindle'
        ? "flex items-center justify-center min-h-screen p-4 bg-white text-black font-serif relative"
        : "flex items-center justify-center min-h-screen p-4 transition-colors duration-300 bg-gray-100 dark:bg-gray-900 relative"
      }>
        {themeToggleButton}
        <div className={theme === 'kindle'
          ? "max-w-md w-full border-4 border-black rounded-lg p-8 text-center bg-white"
          : "max-w-md w-full rounded-2xl shadow-xl overflow-hidden p-8 text-center bg-white dark:bg-gray-800 transition-colors duration-300"
        }>
          <div className={theme === 'kindle'
            ? "w-16 h-16 rounded-full border-2 border-black flex items-center justify-center mx-auto mb-6 bg-white"
            : "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-blue-100 dark:bg-blue-900/50"
          }>
            <Lock className={`w-8 h-8 ${theme === 'kindle' ? 'text-black' : 'text-blue-600 dark:text-blue-400'}`} />
          </div>
          <h1 className={theme === 'kindle'
            ? "text-3xl font-bold mb-2 text-black uppercase tracking-widest"
            : "text-2xl font-bold mb-2 text-gray-800 dark:text-white"
          }>
            Private Access
          </h1>
          <p className={theme === 'kindle'
            ? "mb-8 text-black font-medium text-lg"
            : "mb-8 text-gray-600 dark:text-gray-400"
          }>
            Password required
          </p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Password"
                className={theme === 'kindle'
                  ? `w-full p-4 border-4 rounded-none text-2xl outline-none text-black bg-white ${loginError ? 'border-dashed border-black' : 'border-black'}`
                  : `w-full p-4 border rounded-xl text-lg outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${loginError ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 bg-white dark:bg-gray-700'}`
                }
              />
              {loginError && (
                <p className={theme === 'kindle' ? "text-black font-bold text-lg mt-3 text-left uppercase" : "text-red-500 text-sm mt-2 text-left"}>
                  Incorrect password
                </p>
              )}
            </div>
            <button type="submit" className={theme === 'kindle'
              ? "w-full py-4 bg-black text-white font-bold text-xl uppercase tracking-widest active:bg-white active:text-black border-4 border-black"
              : "w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors text-lg"
            }>
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!selectedQuizId) {
    return (
      <div className={theme === 'kindle'
        ? "p-4 md:p-8 min-h-screen bg-white text-black font-serif relative"
        : "p-4 md:p-8 min-h-screen transition-colors duration-300 bg-gray-100 dark:bg-gray-900 relative"
      }>
        {themeToggleButton}
        <div className="max-w-4xl mx-auto pt-10">
          <div className={theme === 'kindle' ? "border-b-4 border-black pb-6 mb-10 mt-8" : "flex justify-between items-center mb-12 mt-8"}>
            <div>
              <h1 className={theme === 'kindle'
                ? "text-4xl font-bold mb-2 text-black uppercase tracking-widest"
                : "text-4xl font-bold mb-2 text-gray-900 dark:text-white"
              }>
                {theme === 'kindle' ? 'Library' : 'Your Quizzes'}
              </h1>
              <p className={theme === 'kindle'
                ? "text-2xl text-black font-medium"
                : "text-lg text-gray-600 dark:text-gray-400"
              }>
                Select a module to begin
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <button 
              onClick={() => handleSelectQuiz('quiz1')}
              className={theme === 'kindle'
                ? "border-4 border-black rounded-lg p-6 text-left bg-white active:bg-black active:text-white group block w-full"
                : "group rounded-2xl p-6 text-left shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-transparent bg-white dark:bg-gray-800 hover:border-blue-500 dark:hover:border-blue-500 block w-full"
              }
            >
              <div className="flex justify-between items-start mb-6">
                <div className={theme === 'kindle'
                  ? "w-12 h-12 border-2 border-black flex items-center justify-center bg-white group-active:bg-white group-active:text-black"
                  : "w-12 h-12 rounded-xl flex items-center justify-center bg-blue-100 dark:bg-blue-900/50"
                }>
                  <span className={theme === 'kindle' ? "font-bold text-2xl text-black" : "font-bold text-xl text-blue-600 dark:text-blue-400"}>1</span>
                </div>
                <ChevronRight className={`w-8 h-8 ${theme === 'kindle' ? 'text-black group-active:text-white' : 'text-gray-400 group-hover:text-blue-500 transition-colors'}`} />
              </div>
              <h2 className={theme === 'kindle'
                ? "text-3xl font-bold mb-3 text-black group-active:text-white uppercase"
                : "text-2xl font-bold mb-2 text-gray-800 dark:text-white"
              }>QUIZ 1</h2>
              <p className={theme === 'kindle'
                ? "mb-6 text-xl text-black group-active:text-white font-medium"
                : "mb-4 text-gray-600 dark:text-gray-400"
              }>Linux Essentials & OS Fundamentals</p>
              
              <div className={theme === 'kindle' ? "border-t-2 border-black pt-4" : ""}>
                <span className={theme === 'kindle'
                  ? "font-bold text-lg text-black group-active:text-white"
                  : "inline-block px-3 py-1 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }>
                  {quiz1Data.length} Questions
                </span>
              </div>
            </button>

            <button 
              onClick={() => handleSelectQuiz('quiz2')}
              className={theme === 'kindle'
                ? "border-4 border-black rounded-lg p-6 text-left bg-white active:bg-black active:text-white group block w-full"
                : "group rounded-2xl p-6 text-left shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-transparent bg-white dark:bg-gray-800 hover:border-amber-500 dark:hover:border-amber-500 block w-full"
              }
            >
              <div className="flex justify-between items-start mb-6">
                <div className={theme === 'kindle'
                  ? "w-12 h-12 border-2 border-black flex items-center justify-center bg-white group-active:bg-white group-active:text-black"
                  : "w-12 h-12 rounded-xl flex items-center justify-center bg-amber-100 dark:bg-amber-900/50"
                }>
                  <span className={theme === 'kindle' ? "font-bold text-2xl text-black" : "font-bold text-xl text-amber-600 dark:text-amber-400"}>2</span>
                </div>
                <ChevronRight className={`w-8 h-8 ${theme === 'kindle' ? 'text-black group-active:text-white' : 'text-gray-400 group-hover:text-amber-500 transition-colors'}`} />
              </div>
              <h2 className={theme === 'kindle'
                ? "text-3xl font-bold mb-3 text-black group-active:text-white uppercase"
                : "text-2xl font-bold mb-2 text-gray-800 dark:text-white"
              }>QUIZ 2</h2>
              <p className={theme === 'kindle'
                ? "mb-6 text-xl text-black group-active:text-white font-medium"
                : "mb-4 text-gray-600 dark:text-gray-400"
              }>Bash Scripts, Architectures & Operations</p>
              
              <div className={theme === 'kindle' ? "border-t-2 border-black pt-4" : ""}>
                <span className={theme === 'kindle'
                  ? "font-bold text-lg text-black group-active:text-white"
                  : "inline-block px-3 py-1 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }>
                  {quiz2Data.length} Questions
                </span>
              </div>
            </button>

            <button 
              onClick={() => handleSelectQuiz('secret')}
              className={theme === 'kindle'
                ? "border-4 border-black rounded-lg p-6 text-left bg-white active:bg-black active:text-white group block w-full"
                : "group rounded-2xl p-6 text-left shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-transparent bg-white dark:bg-gray-800 hover:border-purple-500 dark:hover:border-purple-500 block w-full"
              }
            >
              <div className="flex justify-between items-start mb-6">
                <div className={theme === 'kindle'
                  ? "w-12 h-12 border-2 border-black flex items-center justify-center bg-white group-active:bg-white group-active:text-black"
                  : "w-12 h-12 rounded-xl flex items-center justify-center bg-purple-100 dark:bg-purple-900/50"
                }>
                  <Lock className={`w-6 h-6 ${theme === 'kindle' ? 'text-black' : 'text-purple-600 dark:text-purple-400'}`} />
                </div>
                <ChevronRight className={`w-8 h-8 ${theme === 'kindle' ? 'text-black group-active:text-white' : 'text-gray-400 group-hover:text-purple-500 transition-colors'}`} />
              </div>
              <h2 className={theme === 'kindle'
                ? "text-3xl font-bold mb-3 text-black group-active:text-white uppercase"
                : "text-2xl font-bold mb-2 text-gray-800 dark:text-white"
              }>SECRET</h2>
              <p className={theme === 'kindle'
                ? "mb-6 text-xl text-black group-active:text-white font-medium"
                : "mb-4 text-gray-600 dark:text-gray-400"
              }>Password protected quiz module</p>
              
              <div className={theme === 'kindle' ? "border-t-2 border-black pt-4" : ""}>
                <span className={theme === 'kindle'
                  ? "font-bold text-lg text-black group-active:text-white"
                  : "inline-block px-3 py-1 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }>
                  {secretQuizData.length} Questions
                </span>
              </div>
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
      <div className={theme === 'kindle'
        ? "p-4 md:p-8 min-h-screen bg-white text-black font-serif relative"
        : "p-4 md:p-8 min-h-screen transition-colors duration-300 bg-gray-100 dark:bg-gray-900 relative"
      }>
        <div className={theme === 'kindle'
          ? "max-w-4xl mx-auto border-4 border-black bg-white"
          : "max-w-4xl mx-auto rounded-2xl shadow-xl overflow-hidden bg-white dark:bg-gray-800 transition-colors"
        }>
          <div className={theme === 'kindle'
            ? "p-8 text-center relative border-b-4 border-black"
            : "p-8 text-center text-white relative bg-blue-600 dark:bg-blue-800"
          }>
            <div className={`absolute flex gap-4 ${theme === 'kindle' ? 'top-4 right-4' : 'top-4 right-4'}`}>
              <button onClick={() => setTheme(t => t === 'default' ? 'kindle' : 'default')} className={theme === 'kindle'
                ? "p-3 border-2 border-black bg-white active:bg-black active:text-white"
                : "p-2 rounded-full hover:bg-white/20 transition-colors text-white"
              } title="Toggle Theme">
                {theme === 'kindle' ? <Palette className="w-6 h-6" /> : <BookOpen className="w-5 h-5" />}
              </button>
              <button onClick={exitQuiz} className={theme === 'kindle'
                ? "p-3 border-2 border-black bg-white active:bg-black active:text-white"
                : "p-2 rounded-full hover:bg-white/20 transition-colors text-white"
              } title="Home">
                <Home className={theme === 'kindle' ? "w-8 h-8" : "w-6 h-6"} />
              </button>
            </div>
            <Award className={`mx-auto mb-6 mt-10 ${theme === 'kindle' ? 'w-20 h-20 text-black' : 'w-16 h-16 text-white'}`} />
            <h1 className={theme === 'kindle' ? "text-4xl font-bold mb-4 text-black uppercase tracking-widest" : "text-3xl font-bold mb-2 text-white"}>
              Results
            </h1>
            <p className={theme === 'kindle'
              ? "text-2xl font-bold text-black border-2 border-black inline-block px-6 py-2"
              : "text-xl text-white"
            }>
              Score: {score} / {activeQuestions.length} ({percentage}%)
            </p>
            {theme !== 'kindle' && (
              percentage >= 80 ? (
                <p className="mt-2 text-green-300 font-semibold">Excellent! You are ready for the exam! 🚀</p>
              ) : (
                <p className="mt-2 text-yellow-300 font-semibold">Good effort! Review the missed questions below to perfect your knowledge.</p>
              )
            )}
          </div>
          
          <div className="p-8 space-y-8 h-[50vh] overflow-y-auto">
            {activeQuestions.map((q, idx) => {
              const isCorrect = checkAnswer(q.id);
              return (
                <div key={q.id} className={theme === 'kindle'
                  ? "p-6 border-4 border-black bg-white"
                  : `p-6 rounded-lg border-l-4 ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-green-500' : 'bg-red-50 dark:bg-red-900/20 border-red-500'}`
                }>
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {isCorrect ? (
                        <CheckCircle2 className={theme === 'kindle' ? "w-10 h-10 text-black" : "text-green-600 dark:text-green-400"} />
                      ) : (
                        <XCircle className={theme === 'kindle' ? "w-10 h-10 text-black" : "text-red-600 dark:text-red-400"} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={theme === 'kindle'
                        ? "font-bold text-2xl mb-4 text-black whitespace-pre-wrap"
                        : "font-semibold text-lg mb-2 text-gray-900 dark:text-white whitespace-pre-wrap"
                      }>
                        Q{idx + 1}: {q.text}
                      </h3>
                      
                      <div className={theme === 'kindle'
                        ? "mb-6 space-y-2 text-xl border-l-4 border-black pl-4"
                        : "mb-3 space-y-1 text-sm"
                      }>
                        <p>
                          <span className={theme === 'kindle' ? "font-bold" : "font-medium text-gray-600 dark:text-gray-400"}>Your Answer: </span>
                          <span className={theme === 'kindle' 
                            ? (isCorrect ? 'font-bold' : 'line-through opacity-70')
                            : `font-medium ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`
                          }>
                            {q.type === 'multiple' 
                              ? (userAnswers[q.id]?.join(', ') || 'None') 
                              : (userAnswers[q.id] || 'None')}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p>
                            <span className={theme === 'kindle' ? "font-bold uppercase" : "font-medium text-gray-600 dark:text-gray-400"}>Correct Answer: </span>
                            <span className={theme === 'kindle' ? "font-bold border-b-2 border-black" : "font-medium text-green-700 dark:text-green-400"}>
                              {q.type === 'multiple' ? q.correctAnswer.join(', ') : q.correctAnswer}
                            </span>
                          </p>
                        )}
                      </div>
                      
                      <div className={theme === 'kindle'
                        ? "mt-4 p-4 border-2 border-black bg-gray-100 text-xl text-black"
                        : "mt-3 text-sm p-3 rounded border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300"
                      }>
                        <span className={theme === 'kindle'
                          ? "font-bold uppercase tracking-wide border-b-2 border-black pb-1 mb-2 inline-block"
                          : "font-bold text-blue-800 dark:text-blue-400 mr-2"
                        }>
                          Explanation:
                        </span> 
                        <div className={theme === 'kindle' ? "mt-2 leading-relaxed" : "inline"}>
                          {q.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={theme === 'kindle'
            ? "p-8 border-t-4 border-black flex flex-col sm:flex-row justify-center gap-6 bg-white"
            : "p-6 border-t flex flex-wrap justify-center gap-4 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          }>
            <button onClick={restartQuiz} className={theme === 'kindle'
              ? "flex-1 flex items-center justify-center gap-3 px-6 py-5 border-4 border-black bg-white text-black font-bold text-xl uppercase active:bg-black active:text-white"
              : "flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            }>
              <RotateCcw className="w-5 h-5" /> Retake All
            </button>
            {hasMissed && (
              <button onClick={retakeMissed} className={theme === 'kindle'
                ? "flex-1 flex items-center justify-center gap-3 px-6 py-5 bg-black text-white font-bold text-xl uppercase active:bg-white active:text-black border-4 border-black"
                : "flex items-center gap-2 px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors shadow-sm"
              }>
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
    <div className={theme === 'kindle'
      ? "flex items-center justify-center p-2 md:p-4 min-h-screen bg-white text-black font-serif"
      : "flex items-center justify-center p-4 min-h-screen transition-colors duration-300 bg-gray-100 dark:bg-gray-900"
    }>
      <div className={theme === 'kindle'
        ? "max-w-4xl w-full border-4 border-black flex flex-col min-h-[600px] bg-white relative"
        : "max-w-3xl w-full rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-[500px] bg-white dark:bg-gray-800 transition-colors relative"
      }>
        {/* Header & Progress */}
        <div className={theme === 'kindle'
          ? "p-6 md:p-8 border-b-4 border-black relative"
          : "text-white p-6 relative bg-blue-600 dark:bg-blue-800"
        }>
          <div className={`absolute flex gap-4 ${theme === 'kindle' ? 'top-6 md:top-8 right-6 md:right-8' : 'top-6 right-6'}`}>
            <button onClick={() => setTheme(t => t === 'default' ? 'kindle' : 'default')} className={theme === 'kindle'
              ? "p-2 border-2 border-black bg-white active:bg-black active:text-white"
              : "p-2 rounded-full hover:bg-white/20 transition-colors text-white"
            } title="Toggle Theme">
              {theme === 'kindle' ? <Palette className="w-6 h-6" /> : <BookOpen className="w-5 h-5" />}
            </button>
            <button onClick={exitQuiz} className={theme === 'kindle'
              ? "p-2 border-2 border-black bg-white active:bg-black active:text-white"
              : "p-2 rounded-full hover:bg-white/20 transition-colors text-white"
            } title="Exit">
              <Home className={theme === 'kindle' ? "w-6 h-6" : "w-5 h-5"} />
            </button>
          </div>
          
          <div className={theme === 'kindle' ? "mb-6 pr-32" : "flex justify-between items-center mb-4 pr-24"}>
            <h2 className={theme === 'kindle'
              ? "text-2xl font-bold text-black uppercase tracking-widest mb-3"
              : "text-xl font-bold text-white"
            }>
              {selectedQuizId === 'quiz1' ? 'QUIZ 1: Linux' : selectedQuizId === 'quiz2' ? 'QUIZ 2: Bash' : 'SECRET QUIZ'}
            </h2>
            <div className={theme === 'kindle'
              ? "font-bold text-xl border-2 border-black inline-block px-4 py-1 text-black"
              : "font-medium px-3 py-1 rounded-full text-sm text-white bg-blue-700 dark:bg-blue-900"
            }>
              {theme === 'kindle' ? `${currentQuestionIndex + 1} / ${activeQuestions.length}` : `Question ${currentQuestionIndex + 1} of ${activeQuestions.length}`}
            </div>
          </div>
          
          <div className={theme === 'kindle'
            ? "w-full border-2 border-black h-4 bg-white p-0.5"
            : "w-full rounded-full h-2 bg-blue-800 dark:bg-blue-900"
          }>
            <div 
              className={theme === 'kindle' ? "bg-black h-full" : "bg-green-400 h-2 rounded-full transition-all duration-300"}
              style={{ width: `${((currentQuestionIndex) / activeQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Area */}
        <div className="p-6 md:p-8 flex-1 flex flex-col">
          <h3 className={theme === 'kindle'
            ? "text-3xl font-bold mb-8 leading-snug text-black whitespace-pre-wrap"
            : "text-2xl font-semibold mb-6 leading-snug text-gray-900 dark:text-white whitespace-pre-wrap"
          }>
            {question.text}
          </h3>

          <div className="space-y-4 flex-1">
            {question.type === 'single' && question.options.map((option, idx) => (
              <button 
                key={idx}
                type="button"
                onClick={() => handleSingleSelect(option)}
                disabled={isChecked}
                className={`w-full text-left flex items-center transition-all ${theme === 'kindle' ? 'p-5 rounded-none' : 'p-4 border rounded-xl'} ${isChecked ? 'cursor-default' : 'cursor-pointer'} ${getOptionStyles(option)}`}
              >
                
                {theme === 'kindle' ? (
                  <div className="w-8 h-8 flex-shrink-0 border-2 border-black rounded-full flex items-center justify-center mr-4 bg-white">
                     {userAnswers[question.id] === option && <div className="w-4 h-4 bg-black rounded-full"></div>}
                  </div>
                ) : (
                  <div className={`w-5 h-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center mr-3 ${userAnswers[question.id] === option ? 'border-blue-600 bg-white' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'}`}>
                     {userAnswers[question.id] === option && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>}
                  </div>
                )}
                <span className={theme === 'kindle' ? "text-2xl" : "ml-3 text-lg"}>{option}</span>
              </button>
            ))}

            {question.type === 'multiple' && (
              <>
                <p className={theme === 'kindle'
                  ? "text-xl font-bold mb-4 uppercase border-b-2 border-black pb-1 inline-block"
                  : "text-sm font-medium mb-3 text-blue-600 dark:text-blue-400"
                }>Select all that apply:</p>
                
                {question.options.map((option, idx) => {
                  const isOptionChecked = (userAnswers[question.id] || []).includes(option);
                  return (
                    <button 
                      key={idx}
                      type="button"
                      onClick={() => handleMultiSelect(option)}
                      disabled={isChecked}
                      className={`w-full text-left flex items-center transition-all ${theme === 'kindle' ? 'p-5 rounded-none' : 'p-4 border rounded-xl'} ${isChecked ? 'cursor-default' : 'cursor-pointer'} ${getOptionStyles(option)}`}
                    >
                      
                      {theme === 'kindle' ? (
                        <div className="w-8 h-8 flex-shrink-0 border-2 border-black flex items-center justify-center mr-4 bg-white">
                          {isOptionChecked && <CheckCircle2 className="w-6 h-6 text-black" />}
                        </div>
                      ) : (
                        <div className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center mr-3 ${isOptionChecked ? 'border-blue-600 bg-blue-600' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'}`}>
                          {isOptionChecked && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                      )}
                      
                      <span className={theme === 'kindle' ? "text-2xl" : "ml-3 text-lg"}>{option}</span>
                    </button>
                  );
                })}
              </>
            )}

            {question.type === 'text' && (
              <div className={theme === 'kindle' ? "mt-6" : "mt-4"}>
                <input 
                  type="text"
                  value={userAnswers[question.id] || ''}
                  onChange={handleTextChange}
                  disabled={isChecked}
                  placeholder="Type answer..."
                  className={theme === 'kindle'
                    ? `w-full p-6 border-4 text-3xl outline-none rounded-none text-black bg-white ${isChecked ? (isCurrentCorrect ? 'border-black font-bold' : 'border-dashed border-black') : 'border-black focus:border-black focus:ring-2 focus:ring-black focus:ring-offset-2'}`
                    : `w-full p-4 border rounded-xl text-lg outline-none transition-all ${isChecked ? (isCurrentCorrect ? 'bg-green-50 border-green-500 text-green-900 dark:bg-green-900/20 dark:text-green-300' : 'bg-red-50 border-red-500 text-red-900 dark:bg-red-900/20 dark:text-red-300') : 'border-gray-300 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500'}`
                  }
                />
              </div>
            )}
            
            {/* Immediate Feedback Container */}
            {isChecked && (
              <div className={theme === 'kindle'
                ? `mt-10 p-6 border-4 shadow-none ${isCurrentCorrect ? 'border-black bg-white' : 'border-black border-dashed bg-white'}`
                : `mt-6 p-5 rounded-xl border-l-4 shadow-sm ${isCurrentCorrect ? 'bg-green-50 border-green-500 dark:bg-green-900/20' : 'bg-red-50 border-red-500 dark:bg-red-900/20'}`
              }>
                <div className={theme === 'kindle' ? "flex items-start gap-6" : "flex items-start gap-4"}>
                  {isCurrentCorrect ? (
                    <CheckCircle2 className={`flex-shrink-0 ${theme === 'kindle' ? 'w-12 h-12 text-black' : 'w-8 h-8 text-green-600 dark:text-green-400'}`} />
                  ) : (
                    <XCircle className={`flex-shrink-0 ${theme === 'kindle' ? 'w-12 h-12 text-black' : 'w-8 h-8 text-red-600 dark:text-red-400'}`} />
                  )}
                  <div>
                    <h4 className={theme === 'kindle'
                      ? "text-3xl font-bold text-black uppercase tracking-widest mb-2"
                      : `text-lg font-bold ${isCurrentCorrect ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`
                    }>
                      {isCurrentCorrect ? (theme === 'kindle' ? 'CORRECT' : 'Correct!') : (theme === 'kindle' ? 'INCORRECT' : 'Incorrect')}
                    </h4>
                    
                    {!isCurrentCorrect && question.type !== 'single' && (
                      <div className={theme === 'kindle'
                        ? "mt-3 mb-4 p-3 border-2 border-black bg-black text-white inline-block"
                        : "mt-2 font-medium inline-block px-3 py-1 rounded bg-white/60 text-red-900 dark:bg-black/30 dark:text-red-200"
                      }>
                        <span className={theme === 'kindle' ? "font-bold uppercase mr-2" : ""}>Correct Answer:</span>
                        <span className={theme === 'kindle' ? "font-bold text-xl" : ""}>
                          {Array.isArray(question.correctAnswer) ? question.correctAnswer.join(', ') : question.correctAnswer}
                        </span>
                      </div>
                    )}
                    
                    <div className={theme === 'kindle'
                      ? "mt-4 leading-relaxed text-2xl text-black"
                      : "mt-3 leading-relaxed text-gray-800 dark:text-gray-300"
                    }>
                      <span className={theme === 'kindle'
                        ? "font-bold uppercase tracking-wider block mb-2 border-b-2 border-black pb-1"
                        : "font-bold block mb-1 text-gray-900 dark:text-white"
                      }>
                        Explanation:
                      </span> 
                      {question.explanation}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className={theme === 'kindle'
          ? "p-6 md:p-8 border-t-4 border-black flex flex-col sm:flex-row justify-between items-center gap-4 bg-white"
          : "p-6 border-t flex justify-between items-center bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        }>
          <button 
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
            className={theme === 'kindle'
              ? `w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 border-4 rounded-none font-bold text-xl uppercase tracking-wider ${
                  currentQuestionIndex === 0 
                  ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                  : 'border-black text-black active:bg-black active:text-white'
                }`
              : `flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-colors ${
                  currentQuestionIndex === 0 
                  ? 'text-gray-400 cursor-not-allowed dark:text-gray-600'
                  : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
                }`
            }
          >
            <ArrowLeft className={theme === 'kindle' ? "w-6 h-6" : "w-5 h-5"} /> {theme === 'kindle' ? 'Back' : 'Previous'}
          </button>
          
          {!isChecked ? (
            <button 
              onClick={handleCheckQuestion}
              disabled={!isCurrentQuestionAnswered()}
              className={theme === 'kindle'
                ? `w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 border-4 rounded-none font-bold text-xl uppercase tracking-wider ${
                    isCurrentQuestionAnswered() 
                    ? 'border-black bg-black text-white active:bg-white active:text-black' 
                    : 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`
                : `flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all shadow-sm ${
                    isCurrentQuestionAnswered() 
                    ? 'bg-amber-500 text-white hover:bg-amber-600' 
                    : 'cursor-not-allowed bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-500'
                  }`
              }
            >
              {theme === 'kindle' ? 'Check' : 'Check Answer'}
            </button>
          ) : (
            <button 
              onClick={nextQuestion}
              className={theme === 'kindle'
                ? "w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-black border-4 border-black text-white rounded-none font-bold text-xl uppercase tracking-wider active:bg-white active:text-black"
                : "flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
              }
            >
              {currentQuestionIndex === activeQuestions.length - 1 ? (theme === 'kindle' ? 'Finish' : 'Finish Quiz') : 'Next'} <ArrowRight className={theme === 'kindle' ? "w-6 h-6" : "w-5 h-5"} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}