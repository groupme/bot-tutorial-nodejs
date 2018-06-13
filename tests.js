var botRegex = /(W|w)hat time is it\?*/;
poonamRegex = /^(P|p)oonam (N|n)i (R|r)aat (C|c)hhe\!*$/;

var testString1 = 'Poonam ni Raat Chhe'
console.log(testString1, poonamRegex.test(testString1));