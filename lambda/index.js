/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = `¡Bienvenido a Programa con Unibe! 
        ¿Sobre qué tema te gustaría aprender hoy? Puedes elegir 
        entre lenguajes de programación, elementos básicos de 
        un programa, sistemas de información, ciclo de vida de una aplicación, 
        informática o tipos de documentación.`;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const optionFacts = {
    "lenguajes de programación": [
        `Los lenguajes de programación son herramientas utilizadas para crear software y aplicaciones.
        Cada lenguaje tiene sus propias reglas sintácticas y semánticas. 
        Los lenguajes más populares incluyen JavaScript y TypeScript para el desarrollo web, 
        Python para el desarrollo de inteligencia artificial y análisis de datos, y 
        Punto NET para el desarrollo de aplicaciones de escritorio y videojuegos. ¿Sobre qué lenguaje te gustaría aprender?. 
        Puedes elegir entre JavaScript y TypeScript, Python y punto NET.
        `,
    ]
};

const CustomOptionIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' && 
               Alexa.getIntentName(handlerInput.requestEnvelope) === 'CustomOptionInitial';
    },
    handle(handlerInput) {
        const option = handlerInput.requestEnvelope.request.intent.slots.option.value.toLowerCase();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let response;

        if (option && optionFacts[option]) {
            sessionAttributes.currentTopic = option;
            sessionAttributes.currentIndex = 0;
            response = optionFacts[option][0];
        } else {
            response = "No tengo información sobre la opción que has mencionado, prueba con otra.";
        }

        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

        return handlerInput.responseBuilder
            .speak(response)
            .reprompt(response)
            .getResponse();
    }
};

const optionLenguaje = {
    "python": [
      `Python es un lenguaje de programación popular por su sencillez y legibilidad, creado por Guido van Rossum y lanzado por primera vez en 1991. 
      Es conocido por su amplia biblioteca estándar y su versatilidad en diferentes áreas como desarrollo web, ciencia de datos, automatización y más. 
      El código Python se escribe en líneas indentadas, lo que mejora la legibilidad, y es un lenguaje interpretado, lo que significa que no necesita ser compilado antes de su ejecución.
      ¿Te gustaría saber más sobre los tipos de datos, operadores lógicos, bucles for, estructuras condicionales if, o flujos de control en Python?`
    ],
    
    "javascript y typescript": [
        `JavaScript es esencial para el desarrollo web, tanto en el frontend como en el backend. 
        Fue desarrollado por Brendan Eich en 1995 durante su trabajo en Netscape Communications Corporation y es el lenguaje principal para la programación del lado del cliente en navegadores web.
        El estándar de JavaScript se llama ECMAScript, mantenido por ECMA International.
        JavaScript permite la creación de aplicaciones web interactivas y dinámicas. ¿Te gustaría saber más sobre los tipos de datos, operadores lógicos, bucles for, estructuras condicionales if, o flujos de control en JavaScript?`
    ],
    
    "punto net": [
      `Punto net es una plataforma de desarrollo que permite crear una amplia gama de aplicaciones, desde web hasta de escritorio. Fue desarrollado por Microsoft y lanzado por primera vez en 2002. 
      Punto net es conocido por su soporte multilinguaje, permitiendo a los desarrolladores usar varios lenguajes de programación como C#, F#, y Visual Basic. 
      Incluye una gran biblioteca estándar llamada .NET Framework Class Library (FCL) y un motor de ejecución conocido como Common Language Runtime (CLR).
      Punto net se utiliza ampliamente para el desarrollo de aplicaciones empresariales, servicios web y aplicaciones de escritorio. ¿Te gustaría saber más sobre los tipos de datos, operadores lógicos, bucles for, estructuras condicionales if, o flujos de control en .NET?`
    ],
};

const CustomOptionLenguageHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' && 
               Alexa.getIntentName(handlerInput.requestEnvelope) === 'CustomMoreLenguageProgramation';
    },
    handle(handlerInput) {
        const lenguage = handlerInput.requestEnvelope.request.intent.slots.lenguage.value.toLowerCase();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let response;

        if (lenguage && optionLenguaje[lenguage]) {
            sessionAttributes.currentTopic = lenguage;
            sessionAttributes.currentIndex = 0;
            response = optionLenguaje[lenguage][0];
        } else {
            response = "No tengo información sobre el lenguaje que has mencionado, prueba con otra.";
        }

        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

        return handlerInput.responseBuilder
            .speak(response)
            .reprompt(response)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        CustomOptionIntentHandler,
        CustomOptionLenguageHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();