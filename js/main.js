$(document).ready(function () {
	//Init Variables
	var choices = [".choice1", ".choice2", ".choice3", ".choice4"];
	var randomQ = Math.floor(Math.random() * choices.length);
	//log random answer
	console.log(randomQ);
	var Num = 0;
	var pointcounter = 0;
	var NoClicks = true;
	var notification = $('.notification');


	//Question

	function Question(image, answer, choice, etchoice) {
		this.image = image;
		this.answer = answer;
		this.choice = choice;
		this.etchoice = etchoice;

		this.game = function () {
			//hide next and retry button 
			$('.notification, .quiz-nav, .new').hide();
			$('#nba-player').attr("src", image);
			$(choice).addClass('answer').append(answer);

			var i = 0;

			for (var x = 0; x <= choices.length; x++) {
				falseAnswers = choices[x];

				if (falseAnswers != choice) {
					$(falseAnswers).append(etchoice[i]);
				}
				i++;
			}

			$('.choice').click(function () {
				if (NoClicks) {
					if ($(this).hasClass('answer')) {
						//prompt me if the answer is correct

						console.log('Answer is correct');
						notification.show().addClass('blue').html("<span>Awesome! You got it!</span>");
						/*$('.answer').addClass('success');   */
						pointcounter++;

					} else {
						
						console.log('Answer is wrong');
					 notification.show().addClass('red').html("<span>Sorry! Wrong Answer!</span>");
						/* $(this).addClass('error');
           $('.answer').addClass('success');*/
					}
					$('.quiz-nav').fadeIn();

				}
				NoClicks = false;
				$(this).removeClass('answer');
			});

		};

	}
	//init array of questions
	var questions = [];

	questions[0] = new Question("img/lebron.png", "LeBron James", ".choice2", ["Dwayne Wade", "Kobe Bryant", "Chris Rock", "Derrick Rose"]);
	questions[1] = new Question("img/wade.png", "Dwayne Wade", ".choice1", ["Tim Duncan", "Kobe Bryant", "Chris Rock", "Derrick Rose"]);
	questions[2] = new Question("img/kobe.png", "Kobe Bryant", ".choice3", ["Dwayne Wade", "Tim Duncan", "LeBron James", "Derrick Rose"]);
	questions[3] = new Question("img/rose.png", "Derrick Rose", ".choice4", ["Dwayne Wade", "Kobe Bryant", "LeBron James", "Tim Duncan"]);
  questions[4] = new Question("img/duncan.png", "Tim Duncan", ".choice2", ["Chris Rock", "Kobe Bryant", "LeBron James", "Derrick Rose"]);

	questions[0].game();

	$('.next').click(function () {
		NoClicks = true;
		$('.notification').hide();
		$('.choice').empty().removeClass('answer');
		questions[Num].game();
		Num++;

		if (Num === questions.length) {
			//Clear out the question area
			$(".game").empty();
			console.log("end of game");
			$('.game').prepend("You got <span>" + pointcounter + " </span> out of <span>" + (Num) + "</span>!");
			$('.new').show().click(function () {
				console.log("retry button clicked");
				/* Reset game here*/
				location.reload();
			});

		}
	});


});