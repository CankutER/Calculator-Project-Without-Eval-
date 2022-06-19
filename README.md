# Calculator-Project (Without Eval)

This is a JS calculator project without using eval function. To execute the calculations w.r.t priority rules, a master array is defined to store the command types and order of these commands. When a calculation is requested, last command in the master array is fired and sequence is proceeded until the first member. Since a low priority command is never stored in the last member of the master array if any higher prio command is present, calculation rules are made sure to be complied.

This project is subject to improvements in terms of styling and adding extra calculator functions.
