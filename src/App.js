import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <PostArray/>
      </MuiThemeProvider>
    );
  }
}

const Button = () => (
  <RaisedButton label="Default" />
);

class Post extends React.Component{
  render(){
    return (
       <Card>
        <CardHeader
          title={this.props.poster}
          subtitle={this.props.subtitle}
          avatar={this.props.avatar}
        />
        <CardText>
          {this.props.text}
        </CardText>
      </Card>
      )
  }
}

const avatar = "http://fi.somethingawful.com/safs/titles/16/a4/00129241.0008.jpg"
const subtitle = "your: belonging to a person you're: you are lose: opposite of win loose: your mom HTH Beaky the Tortoise says, click here to join our choose Your Own Adventure Game! Paradise Lost: Clash of the Heavens!"
const text1 = `You have just crashed in a tremendously improbable manner, crashing into what is almost certainly the deepest body of water in city of Acco and one you did not even know existed, certainly not one you were aiming for. A part of the back of your mind is very tender, that part which often flares up when you exert yourself hard in training, first from whatever... whatever happened with that arrow and then from the exertion of defensively hardening yourself. You center yourself for a moment and consider [???].

You have just lost a very large amount of [???]. The accumulation of years? Several very confused slaves begin to gather outside of the cistern and only a moment later a number of palace guards, their spears raised, you hear one of them shout "BE READY FOR ANYTHING!" By the time you climb to the top of the cistern you see a phalanx of spears assembled and ready to repulse you. You recognize the man with the most impressive helmet.`

const text2 =`Sumu, son of Abum. One of the officers of the palace guard, you only know the man's name from when you were wined and dined by Khabba years ago. Sumu and all of the others surrounding the cistern seem more than a little shocked to see YOU climb out, they probably expected some sort of demon? Sumu shouts "Spears down! Spears down you fools!" The man looks to you as the soldiers lower their weapons and then in a tone of obvious confusion asks "....Hero? How did you get in here? What happened? Is the King alright?"

You tell him you don't know about the King and as to how you get here... "That is a long story. But that is not important now. What matters is..." you are leaning over the edge of the cistern, still in the water, your posture not unlike a person leaning on the edge of a pool but still within it "...just a moment." You swim down into the cistern and search the bottom. You recover your bow and pluck the string once, it is fine. You recover several of your arrows but you've lost a number in your... flight, despite your best effort to hold onto them. You find a few more outside of the cistern when you eventually climb out, you are down from forty to nineteen Blooded Bronze. If the battle is won Snarls can help you find them later but they could be scattered literally anywhere in the city. Several slaves rush over to offer you towels and they begin to dry you off, Sumu asks "Are we winning at least? Can you tell me that Hero?" You tell him yes, indeed we are winning! This gets a cheer from the soldiers who raise their spears in the air! You tell them that the Bnaimokt are in full retreat but the giants and demon are attacking, so it is more important than ever they stay at their posts. Still confused and bewildered at how exactly the famous Hero Enkidel... suddenly appeared in the palace cistern Sumu asks you "Is there anything you need, Hero?"`

const text3 = `You have no mundane arrows anymore. You do have a Blooded Bronze sword on your hip. You do not have a spear or a club. You also do not have a shield.

Mercy is actually not all that far away from the palace, though it is a weapon designed to fight lesser foes and at your full strength you can break it. Can the Amalakite Giants? It is not in any way a nimble weapon and you saw the Amalakites show tremendous dexterity, you do not like your odds fighting them with it.

Last you knew, most of your men were east of the city chasing the Bnaimokt, or holding the south eastern breach from Bnaimokt forces. Danal is probably still holding the southwest breach. Tudiya is... you don't actually know. Somewhere east of the city, hopefully still north of the river, fighting Gebek?

Aaron was, last you saw him west of the city, just beyond the walls fighting several giants, though several more yet remain and according to Aaron none of them were dead, in fact the single one which was not wounded seemed to be trying to heal the others? Will they be back in the fight? You tore the head of the greatsword-giant off but you still do not know if THAT one is even dead yet. You saw what happened to First and Second and though the Amalakite Giants you see here are not ox-demons, First and Second possessed incredible regenerative powers. Then again, you've fought some Amalakite Giants before and they died easily enough to serious wounds and for their strength and mystical abilities did not seem impossibly tough?
`
const PostArray = ()=>{
  return (
    <Card>
      <CardText>
        <Post poster="Diogines" avatar={avatar} subtitle={subtitle} text={text1}/>
        <br/>
        <Post poster="Diogines" avatar={avatar} subtitle={subtitle} text={text2}/>
        <br/>
        <Post poster="Diogines" avatar={avatar} subtitle={subtitle} text={text3}/>
        <Button />
      </CardText>
    </Card>
  );
}

export default App;
