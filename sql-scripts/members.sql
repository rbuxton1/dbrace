CREATE TABLE `member` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL COMMENT 'Name of this member',
  `email` varchar(100) NOT NULL COMMENT 'Email of this member',
  `points` int(11) NOT NULL COMMENT 'The number of points this member has',
  `last` date NOT NULL COMMENT 'The last time this member did anything'
);

ALTER TABLE `member`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `member`
  MODIFY `id` int NOT NULL AUTO_INCREMENT
COMMIT;
