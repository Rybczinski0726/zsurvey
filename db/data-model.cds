namespace sds.survey;

entity Result {
  key ID    : UUID;
  company   : String(30);
  name1     : String(30);
  phone     : String(30);
  q1        : String(30);
  q2        : String(30);
  q2_1      : String(30);
  q2_2      : String(30);
  q2_3      : String(30);
  q3        : String(30);
  q4        : String(30);
  q4_1      : String(30);
  q5        : String(30);
  q5_1      : String(30);
  q6        : String;
}
