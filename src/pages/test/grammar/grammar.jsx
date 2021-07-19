import React from "react";
import './grammar.scss';

const Grammar = () => {
  const grammarTasks = [
    {
      sentence: 'The best berries for me … strawberries.',
      options: [
        {
          option: 'is',
          isRight: false
        },
        {
          option: 'are',
          isRight: true
        },
        {
          option: 'be',
          isRight: false
        },
        {
          option: 'am',
          isRight: false
        }
      ]
    },
    {
      sentence: 'He … swim very well. He is the best swimmer in the team!',
      options: [
        {
          option: 'can',
          isRight: true
        },
        {
          option: 'must',
          isRight: false
        },
        {
          option: 'should',
          isRight: false
        },
        {
          option: 'have to',
          isRight: false
        }
      ]
    },
    {
      sentence: 'The best berries for me … strawberries.',
      options: [
        {
          option: 'is',
          isRight: false
        },
        {
          option: 'are',
          isRight: true
        },
        {
          option: 'be',
          isRight: false
        },
        {
          option: 'am',
          isRight: false
        }
      ]
    },
    {
      sentence: 'He … swim very well. He is the best swimmer in the team!',
      options: [
        {
          option: 'can',
          isRight: true
        },
        {
          option: 'must',
          isRight: false
        },
        {
          option: 'should',
          isRight: false
        },
        {
          option: 'have to',
          isRight: false
        }
      ]
    },{
      sentence: 'The best berries for me … strawberries.',
      options: [
        {
          option: 'is',
          isRight: false
        },
        {
          option: 'are',
          isRight: true
        },
        {
          option: 'be',
          isRight: false
        },
        {
          option: 'am',
          isRight: false
        }
      ]
    },
    {
      sentence: 'He … swim very well. He is the best swimmer in the team!',
      options: [
        {
          option: 'can',
          isRight: true
        },
        {
          option: 'must',
          isRight: false
        },
        {
          option: 'should',
          isRight: false
        },
        {
          option: 'have to',
          isRight: false
        }
      ]
    },{
      sentence: 'The best berries for me … strawberries.',
      options: [
        {
          option: 'is',
          isRight: false
        },
        {
          option: 'are',
          isRight: true
        },
        {
          option: 'be',
          isRight: false
        },
        {
          option: 'am',
          isRight: false
        }
      ]
    },
    {
      sentence: 'He … swim very well. He is the best swimmer in the team!',
      options: [
        {
          option: 'can',
          isRight: true
        },
        {
          option: 'must',
          isRight: false
        },
        {
          option: 'should',
          isRight: false
        },
        {
          option: 'have to',
          isRight: false
        }
      ]
    },{
      sentence: 'The best berries for me … strawberries.',
      options: [
        {
          option: 'is',
          isRight: false
        },
        {
          option: 'are',
          isRight: true
        },
        {
          option: 'be',
          isRight: false
        },
        {
          option: 'am',
          isRight: false
        }
      ]
    },
    {
      sentence: 'He … swim very well. He is the best swimmer in the team!',
      options: [
        {
          option: 'can',
          isRight: true
        },
        {
          option: 'must',
          isRight: false
        },
        {
          option: 'should',
          isRight: false
        },
        {
          option: 'have to',
          isRight: false
        }
      ]
    }
  ];
  let number = 0;
  const questions = grammarTasks.map((item1) => {
    number++;
    const options = item1.options.map((item2) => {
      const group = 'group-' + number;
      return (
        <div key={item2.option} className='option'>
          <input type="radio" name={group} value={item2.option}/>
            <label> {item2.option}</label>
        </div>);
    });
    return (
      <div key={number}>
        <div className='question'>
          <span className='question number'>{number}. </span>
          <span className='question sentence'>{item1.sentence}</span>
        </div>
        {options}
      </div>
    );
  });
  return (
    <>
      <div className='stepDescription'>Choose the correct option to complete the sentence</div>
      {questions}
    </>
);
};


export default Grammar;
