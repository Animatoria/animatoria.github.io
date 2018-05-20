    function rowCount(e) {

      function makeWordsMap() {

        function ExceptSymbol(index, type) {
          this.index = index;
          this.type = type;
        }

        function findLetters(letter, type) {
          var index = e.area.value.indexOf(letter);
          var letters = [];
          while (index != -1) {
            var prevIndex = index;
            index = e.area.value.indexOf(letter, prevIndex + 1);
            letters.push(new ExceptSymbol(prevIndex, type));
          }
          return letters;
        }

        function sortProcess(a, b) {
          if (a.index > b.index) return 1;
          if (b.index > a.index) return -1;
          return 0          
        }

        function addLettersLength(indexMap) {
          for (var i in indexMap) {
            if (i == 0) {
              indexMap[i].letterLength = indexMap[i].index;
            } else {
              indexMap[i].letterLength = indexMap[i].index - indexMap[i-1].index - 1;
            }
          }
        }

        var indexMap =  findLetters(' ', 'space').concat(findLetters('\n', 'enter'));

        indexMap.push(new ExceptSymbol(e.area.value.length, 'end'));

        indexMap.sort(sortProcess);

        addLettersLength(indexMap);

        return indexMap
      }

      var wordsMap = makeWordsMap();

      var lineSumm = 0;
      var finallyLines = 1;

      for (var i in wordsMap) {
        lineSumm += wordsMap[i].letterLength;
        if (wordsMap[i].type == 'space') {
          lineSumm++;
        }
        if (lineSumm > e.colWidth) {
          finallyLines++;
          if (wordsMap[i].letterLength == e.colWidth) {
            lineSumm = 0;
          } else if (wordsMap[i].letterLength > e.colWidth) {
            finallyLines += Math.floor((wordsMap[i].letterLength - 1)/e.colWidth) - ((i == 0) || (wordsMap[i - 1].type == 'enter'));
            lineSumm = wordsMap[i].letterLength%e.colWidth;
          } else {
            lineSumm = wordsMap[i].letterLength;
          }
          if (wordsMap[i].type == 'space') {
            lineSumm++;
          }
        }
        if (wordsMap[i].type == 'enter') {
          finallyLines++;
          lineSumm = 0;
        }
      }
      return finallyLines
    }