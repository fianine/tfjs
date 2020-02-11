/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

// import {max} from './kernel_names';
import {ENGINE} from '../../engine';
import {NamedAttrMap, NamedTensorInfoMap, registerKernel, TensorInfo} from '../../kernel_registry';
import {parseAxisParam} from '../../util';

import {MathBackendCPU} from './backend_cpu';
import {assertNotComplex} from './cpu_util';

// import {max} from '../../ops/reduction_ops';

interface SoftmaxInputs extends NamedTensorInfoMap {
  x: TensorInfo;
}

interface SoftmaxAttrs extends NamedAttrMap {
  dim: number;
}

/**
 * max_impl exports max kernel func
 * max.ts uses register kernel, it imports max_impl
 * softmax imports max_impl
 */

registerKernel({
  kernelName: 'Softmax',
  backendName: 'cpu',
  kernelFunc: ({inputs, attrs, backend}) => {
    const {x} = inputs as SoftmaxInputs;
    const {dim} = attrs as SoftmaxAttrs;

    const cpuBackend = backend as MathBackendCPU;
    assertNotComplex(x, 'Softmax');

    const axes = parseAxisParam([dim], x.shape);
    // const maxLogit = max(x, axes);
    const maxLogit = ENGINE.runKernel();
  }
});
