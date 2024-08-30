pragma circom 2.0.0;

template IsEqual() {
    signal input in[2];
    signal output out;

    signal diff;
    signal isZero;

    diff <== in[0] - in[1];
    isZero <== diff * diff;

    out <== 1 - isZero;
}

template ClickProof() {
    signal input devAddress;
    signal input clicks;
    signal output valid;

    component isValid = IsEqual();
    isValid.in[0] <== clicks;
    isValid.in[1] <== clicks;

    valid <== isValid.out; 
}

component main {public [devAddress,clicks]} = ClickProof();
